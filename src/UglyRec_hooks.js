import React, { useState } from "react";
import "./Rec.css";

const RecType = {
  Preview: "PREVIEW",
  Record: "RECORD",
};

export default function () {
  const [recType, setRecType] = useState(RecType.Preview);
  const [isRecording, setIsRecording] = useState(false);
  const [hasStartUp, setHasStartUp] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

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

  const handleSwitchRecType = () => {
    if (recType === RecType.Record) {
      setRecType(RecType.Preview);
      setIsFinish(false);
    } else {
      setRecType(RecType.Record);
    }
  };

  const handleStartRecord = () => {
    setIsRecording(true);
    setHasStartUp(true);
  };

  const handlePauseRecord = () => {
    setIsRecording(false);
  };

  const handleEndRecord = () => {
    setIsRecording(false);
    setHasStartUp(false);
    setIsFinish(true);
  };

  const handleResumeRecord = () => {
    setIsRecording(true);
  };

  return (
    <>
      <div className="view">{viewText}</div>
      {!hasStartUp && (
        <button
          className="rec-type-swtich-btn btn"
          onClick={handleSwitchRecType}
        >
          {btnText}
        </button>
      )}
      {!hasStartUp && recType === RecType.Record && !isFinish && (
        <button className="btn" onClick={handleStartRecord}>
          开始录制
        </button>
      )}
      {isRecording && recType === RecType.Record && (
        <button className="btn" onClick={handlePauseRecord}>
          暂停录制
        </button>
      )}
      {!isRecording && recType === RecType.Record && hasStartUp && (
        <button className="btn" onClick={handleResumeRecord}>
          继续录制
        </button>
      )}
      {isRecording && recType === RecType.Record && (
        <button className="btn" onClick={handleEndRecord}>
          终止录制
        </button>
      )}
    </>
  );
}
