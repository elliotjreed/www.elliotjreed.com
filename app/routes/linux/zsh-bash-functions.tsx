import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";

export const meta = () => [
  { title: "ZSH & Bash Functions | EJR" },
  {
    name: "description",
    content: "A collection of useful ZSH, Bash, and Shell functions for use on Linux (or Mac or Windows).",
  },
];

const snippets: CodeSnippetInterface[] = [
  {
    title: "fixpermissions",
    code: `# Set all files in a directory to 644 permissions and directories to 775
function fixpermissions() {
  find ./ -type d -print0 | xargs -0 chmod 0775
  find ./ -type f -print0 | xargs -0 chmod 0644
}
`,
  },
  {
    title: "fixsshpermissions",
    code: `# Set all files in the ~/.ssh to 644 permissions and directories to 775
function fixsshpermissions() {
  chmod -R 700 ~/.ssh/
  chmod 600 ~/.ssh/id_rsa
  chmod 600 ~/.ssh/config
  chmod 644 ~/.ssh/id_rsa.pub
  chmod 600 ~/.ssh/authorized_keys
}
`,
  },
  {
    title: "myip",
    code: `# Return public and local IP address
function myip() {
  publicip=$(curl -s https://ipecho.net/plain)
  localip=$(ip -o -4 addr show | awk -F '[ /]+' '/global/ {print $4}')
  echo -e "Public IP: " $publicip
  echo -e "Local IP: " $localip
}
`,
  },
  {
    title: "psg",
    code: `# Search processes containing a string or command (Usage: psg TERM)
psg() {
  if [[ $# -eq 0 ]] ; then
    echo -e "\\e[0;31mPlease provide a process name.\\e[0m"
  else
    ps aux | grep -v grep | grep -i -e VSZ -e "$@"
  fi
}
`,
  },
  {
    title: "search",
    code: `# Search current directory for files containing specified string (Usage: searchdir "Search Term")
search() {
  if [[ $# -eq 0 ]] ; then
    echo -e "\\e[0;31mPlease provide a string / search term\\e[0m"
  else
    grep -rni "$@" .
  fi
}
`,
  },
  {
    title: "backup",
    code: `# Backup a file by copying the file and prepending .bak to it (Usage: backup file.txt)
backup() {
  cp -- "$1"{,.bak};
}
`,
  },
  {
    title: "certgen",
    code: `# Generate self-signed CA, intermediate, and server certificates and keys
function certgen() {
  openssl req -x509 \\
    -sha256 \\
    -newkey rsa:4096 \\
    -days 14600 \\
    -nodes \\
    -subj "/C=GB/ST=Localhost/L=Localhost/O=Localhost Certificate Authority/OU=Certificate Authority Certificate Issuer/CN=localhost" -out ca.crt -keyout ca.key

  openssl genrsa -out server.key 4096

  cat > csr.conf <<EOF
[ req ]
default_bits = 4096
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[ dn ]
C = GB
ST = Localhost
L = Localhost
O = Localhost Server Certificate
OU = Localhost Server Certificate Issuer
CN = localhost

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = localhost
IP.1 = 127.0.0.1
EOF

  openssl req -new -key server.key -out server.csr -config csr.conf

  cat > cert.conf <<EOF
authorityKeyIdentifier = keyid, issuer
basicConstraints = CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
IP.1 = 127.0.0.1
EOF

  openssl x509 -req \\
      -in server.csr \\
      -CA ca.crt -CAkey ca.key \\
      -CAcreateserial -out server.crt \\
      -days 14600 \\
      -sha256 -extfile cert.conf

  rm -f ./cert.conf ./csr.conf

read -p "Do you want to add the CA certificate to your operating system trusted certificates? (y/N) " -n 1 -r

  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    if [ -d "/etc/pki/ca-trust/source/anchors" ]; then
      sudo cp ca.crt /etc/pki/ca-trust/source/anchors/ca.crt
      update-ca-trust extract
    fi

    if [ -d "/usr/local/share/ca-certificates" ]; then
      sudo cp ca.crt /usr/local/share/ca-certificates/ca.crt
      update-ca-certificates
    fi

    if [ -d "/etc/ca-certificates/trust-source/anchors" ]; then
      sudo cp ca.crt /etc/ca-certificates/trust-source/anchors/ca.crt
      trust extract-compat
    fi

    if [ -d "/usr/share/pki/trust/anchors" ]; then
      sudo cp ca.crt /usr/share/pki/trust/anchors/ca.crt
      update-ca-certificates
    fi
  fi
}
`,
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Shell Functions
      </h1>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Here you'll find a few handy functions to use in ZSH and Bash Shell. Tested on Linux - likely work on Mac!
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        {snippets.map(
          (snippet: CodeSnippetInterface): ReactElement => (
            <CodeSnippet key={snippet.title} code={snippet.code} title={snippet.title} />
          ),
        )}
      </section>
    </div>
  </section>
);
