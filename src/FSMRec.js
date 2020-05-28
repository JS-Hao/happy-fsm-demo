import React from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import "./Rec.css";

const recMachine = Machine({
  id: "rec",
  initial: "preview",
  context: {
    retries: 0,
  },
  states: {
    preview: {
      id: "preview_uid",
      on: {
        SWITCH_REC_TYPE: "record",
      },
    },
    record: {
      id: "record_uid",
      initial: "notStart",
      on: {
        SWITCH_REC_TYPE: "preview",
      },
      states: {
        notStart: {
          on: {
            START: "started",
          },
        },
        started: {
          on: {
            PAUSE: "paused",
            END: "ended",
          },
        },
        paused: {
          on: {
            RESUME: "started",
            END: "ended",
          },
        },
        ended: {
          on: {
            SWITCH_REC_TYPE: "#preview_uid",
          },
        },
      },
    },
  },
});

export default function () {
  const [state, send] = useMachine(recMachine);

  const viewText = (({ state }) => {
    if (state.matches("preview")) {
      return "预览模式";
    } else if (state.matches("record.started")) {
      return "录制中...";
    } else if (state.matches("record.paused")) {
      return "暂停中...";
    } else if (state.matches("record.notStart")) {
      return "录制模式";
    } else {
      return "异常状态";
    }
  })({ state });

  const btnText = state.matches("preview") ? "进入录制模式" : "进入预览模式";
  const handleSwitchRecType = () => send("SWITCH_REC_TYPE");
  const handleStartRecord = () => send("START");
  const handlePauseRecord = () => send("PAUSE");
  const handleEndRecord = () => send("END");
  const handleResumeRecord = () => send("RESUME");

  return (
    <>
      <div className="view">{viewText}</div>
      {(state.matches("preview") ||
        state.matches("record.notStart") ||
        state.matches("record.ended")) && (
        <button
          className="rec-type-swtich-btn btn"
          onClick={handleSwitchRecType}
        >
          {btnText}
        </button>
      )}
      {state.matches("record.notStart") && (
        <button className="btn" onClick={handleStartRecord}>
          开始录制
        </button>
      )}
      {state.matches("record.started") && (
        <button className="btn" onClick={handlePauseRecord}>
          暂停录制
        </button>
      )}
      {state.matches("record.paused") && (
        <button className="btn" onClick={handleResumeRecord}>
          继续录制
        </button>
      )}
      {(state.matches("record.paused") || state.matches("record.started")) && (
        <button className="btn" onClick={handleEndRecord}>
          终止录制
        </button>
      )}
    </>
  );
}
