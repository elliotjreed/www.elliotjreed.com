import * as React from "react";

interface EmptyProps {
}

interface EmptyState {
}

export default class Loading extends React.Component<EmptyProps, EmptyState> {
  render(): React.ReactNode {
    return (
      <div>
        <img width='30px'
             height='30px'
             src="data:image/svg+xml;charset=UTF-8,%3csvg class='lds-spinner' width='50%' height='50%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3e%3cg transform='rotate(0 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.9166666666666666s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(30 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.8333333333333334s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(60 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.75s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(90 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.6666666666666666s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(120 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.5833333333333334s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(150 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.5s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(180 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.4166666666666667s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(210 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.3333333333333333s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(240 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.25s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(270 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.16666666666666666s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(300 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.08333333333333333s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3cg transform='rotate(330 50 50)'%3e%3crect x='47' y='24' rx='9.4' ry='4.8' width='6' height='12' fill='%23000000'%3e%3canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='0s' repeatCount='indefinite'%3e%3c/animate%3e%3c/rect%3e%3c/g%3e%3c/svg%3e"/>
        <span>Loading...</span>
      </div>
    );
  }
}
