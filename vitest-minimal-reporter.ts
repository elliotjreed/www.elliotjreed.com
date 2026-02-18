import type { Reporter, TestCase, TestModule, TestSuite, Vitest } from "vitest/node";

interface FailedTest {
  file: string;
  testName: string;
  errors: Array<{ message?: string }>;
}

/**
 * Minimal Vitest reporter optimised for LLM token usage.
 * Shows only failing tests and summary statistics.
 */
export default class MinimalReporter implements Reporter {
  private vitest!: Vitest;
  private failedTests: FailedTest[] = [];
  private testModules: TestModule[] = [];

  onInit(vitest: Vitest): void {
    this.vitest = vitest;
  }

  onTestModuleEnd(testModule: TestModule): void {
    this.testModules.push(testModule);
    // Collect failed tests from this module
    if (testModule.children) {
      const children = testModule.children.array();
      this.collectFailedTests(children, testModule.moduleId);
    }
  }

  onTestRunEnd(): void {
    // Print failed tests
    if (this.failedTests.length > 0) {
      for (const failed of this.failedTests) {
        const relativePath = failed.file.replace(`${process.cwd()}/`, "");
        console.log(`\nFAIL ${relativePath} > ${failed.testName}`);

        // Print only error messages (no stack traces for minimal output)
        for (const error of failed.errors) {
          if (error.message) {
            console.log(error.message);
          }
        }
      }
    }

    // Calculate statistics
    let totalTests: number = 0;
    let passedTests: number = 0;
    let failedTestCount: number = 0;
    let passedModules: number = 0;
    let failedModules: number = 0;
    let totalDuration: number = 0;

    for (const module of this.testModules) {
      if (module.children) {
        const counts = this.countTests(module.children.array());
        totalTests += counts.total;
        passedTests += counts.passed;
        failedTestCount += counts.failed;

        const moduleHasFailures = counts.failed > 0;
        if (moduleHasFailures) {
          failedModules++;
        } else if (counts.total > 0) {
          passedModules++;
        }
      }

      totalDuration += module.diagnostic().duration;
    }

    console.log("\n");

    // Test Files summary
    const filesParts: string[] = [];
    if (failedModules > 0) {
      filesParts.push(`${failedModules} failed`);
    }
    if (passedModules > 0) {
      filesParts.push(`${passedModules} passed`);
    }
    console.log(`Test Files ${filesParts.join(" | ")} (${this.testModules.length})`);

    // Tests summary
    const testsParts: string[] = [];
    if (failedTestCount > 0) {
      testsParts.push(`${failedTestCount} failed`);
    }
    if (passedTests > 0) {
      testsParts.push(`${passedTests} passed`);
    }
    console.log(`Tests ${testsParts.join(" | ")} (${totalTests})`);

    // Duration
    const durationSeconds = (totalDuration / 1000).toFixed(2);
    console.log(`Duration ${durationSeconds}s`);
  }

  private collectFailedTests(items: (TestCase | TestSuite)[], filepath: string, prefix = ""): void {
    for (const item of items) {
      if (item.type === "test") {
        const testCase = item as TestCase;
        if (testCase.result()?.state === "failed") {
          const fullName = prefix ? `${prefix} > ${testCase.name}` : testCase.name;
          const errors =
            testCase.result()?.errors?.map((error) => ({
              message: error?.message,
            })) || [];

          this.failedTests.push({
            file: filepath,
            testName: fullName,
            errors,
          });
        }
      }

      // Recursively check suites
      if (item.type === "suite") {
        const suite: TestSuite = item as TestSuite;
        const newPrefix: string = suite.name ? (prefix ? `${prefix} > ${suite.name}` : suite.name) : prefix;
        const suiteChildren: (TestCase | TestSuite)[] = suite.children.array();
        this.collectFailedTests(suiteChildren, filepath, newPrefix);
      }
    }
  }

  private countTests(items: (TestCase | TestSuite)[]): { total: number; passed: number; failed: number } {
    let total = 0;
    let passed = 0;
    let failed = 0;

    for (const item of items) {
      if (item.type === "test") {
        const testCase = item as TestCase;
        total++;
        const state: "passed" | "failed" | "skipped" | "pending" = testCase.result()?.state;
        if (state === "passed") passed++;
        if (state === "failed") failed++;
      }

      if (item.type === "suite") {
        const suite = item as TestSuite;
        const suiteChildren: (TestCase | TestSuite)[] = suite.children.array();
        const counts: { total: number; passed: number; failed: number } = this.countTests(suiteChildren);
        total += counts.total;
        passed += counts.passed;
        failed += counts.failed;
      }
    }

    return { total, passed, failed };
  }
}
