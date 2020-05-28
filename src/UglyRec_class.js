import React from "react";
import "./Rec.css";

const RecType = {
  Preview: "PREVIEW",
  Record: "RECORD",
};

export default class UglyRec extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recType: RecType.Preview,
      isRecording: false,
      hasStartUp: false,
      isFinish: false,
    };
  }

  handleSwitchRecType = () => {
    if (this.state.recType === RecType.Record) {
      this.setState({
        recType: RecType.Preview,
        isFinish: false,
      });
    } else {
      this.setState({
        recType: RecType.Record,
      });
    }
  };

  handleStartRecord = () => {
    this.setState({ isRecording: true, hasStartUp: true });
  };

  handlePauseRecord = () => {
    this.setState({ isRecording: false });
  };

  handleEndRecord = () => {
    this.setState({ isRecording: false, hasStartUp: false, isFinish: true });
  };

  handleResumeRecord = () => {
    this.setState({ isRecording: true });
  };

  render() {
    const { recType, isRecording, hasStartUp, isFinish } = this.state;
    const viewText = (({ recType }) => {
      if (recType === RecType.Preview) {
        return "预览模式";
      } else if (!hasStartUp && !isRecording) {
        return "录制模式";
      } else if (isRecording) {
        return "录制中...";
      } else if (!isRecording) {
        return "暂停中...";
      } else {
        return "异常状态";
      }
    })({ recType });

    const btnText = (({ recType }) => {
      if (recType === RecType.Preview) {
        return "进入录制模式";
      } else {
        return "进入预览模式";
      }
    })({ recType });

    return (
      <>
        <div className="view">{viewText}</div>
        {!hasStartUp && (
          <button
            className="rec-type-swtich-btn btn"
            onClick={this.handleSwitchRecType}
          >
            {btnText}
          </button>
        )}
        {!hasStartUp && recType === RecType.Record && !isFinish && (
          <button className="btn" onClick={this.handleStartRecord}>
            开始录制
          </button>
        )}
        {isRecording && recType === RecType.Record && (
          <button className="btn" onClick={this.handlePauseRecord}>
            暂停录制
          </button>
        )}
        {!isRecording && recType === RecType.Record && hasStartUp && (
          <button className="btn" onClick={this.handleResumeRecord}>
            继续录制
          </button>
        )}
        {isRecording && recType === RecType.Record && (
          <button className="btn" onClick={this.handleEndRecord}>
            终止录制
          </button>
        )}
      </>
    );
  }
}
