import { html } from "https://esm.sh/htm@3.1.1/react?deps=react@18.3.1";
import { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { ReactFlowProvider } from "https://esm.sh/@xyflow/react@12.3.6?deps=react@18.3.1,react-dom@18.3.1";
import { Sidebar } from "./components/Sidebar.js";
import { FlowCanvas } from "./components/FlowCanvas.js";
import { AppFooter } from "./components/AppFooter.js";
import { PLAN_OPTION_CARDS } from "./data/planOptions.js";

export function App() {
  const [selectedId, setSelectedId] = useState(PLAN_OPTION_CARDS[1].id);
  const [stage, setStage] = useState("define");
  const [clarifyMessage, setClarifyMessage] = useState("Sure i'll try the local approach");

  const progressState = useMemo(() => {
    if (stage === "define") return { activeIndex: 0, completed: [] };
    if (stage === "the-plan")
      return { activeIndex: 4, completed: [0, 1, 2, 3] };
    if (stage === "key-pieces-loading" || stage === "key-pieces")
      return { activeIndex: 3, completed: [0, 1, 2] };
    if (
      stage === "confirm" ||
      stage === "confirm-intro" ||
      stage === "loading" ||
      stage === "revise"
    )
      return { activeIndex: 2, completed: [0, 1] };
    return { activeIndex: 1, completed: [0] };
  }, [stage]);

  useEffect(() => {
    if (stage !== "loading") return undefined;
    const timer = setTimeout(() => {
      setStage("confirm-intro");
    }, 1500);
    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "key-pieces-loading") return undefined;
    const timer = setTimeout(() => {
      setStage("key-pieces");
    }, 5000);
    return () => clearTimeout(timer);
  }, [stage]);

  function handleCardDrop(cardId) {
    setSelectedId(cardId);
    setStage("clarify-1");
    setClarifyMessage("Sure i'll try the local approach");
  }

  function handleCardDragStart(event, cardId) {
    if (!event.dataTransfer) return;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", cardId);
    event.dataTransfer.setData("application/x-array-card", cardId);
  }

  function handleClarifySend() {
    if (stage === "clarify-1") {
      setStage("clarify-2");
      setClarifyMessage("yes i can do that");
      return;
    }
    if (stage === "clarify-2") {
      setStage("loading");
      return;
    }
    if (stage === "revise") {
      setStage("confirm");
    }
  }

  function handleConfirmSend() {
    setStage("confirm");
  }

  function handleKeepWorking() {
    setStage("revise");
    setClarifyMessage(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum vel leo gravida, eu sollicitudin enim accumsan. Etiam vestibulum, quam id euismod vulputate, sapien ex blandit leo.",
    );
  }

  function handlePerfect() {
    setStage("key-pieces-loading");
  }

  function handleShowPlan() {
    setStage("the-plan");
  }

  return html`
    <div className="flex h-screen min-h-0 w-screen flex-col overflow-hidden bg-[#EADFFF]">
      <div className="flex min-h-0 min-w-0 flex-1">
        <${Sidebar}
          stage=${stage}
          selectedId=${selectedId}
          onSelectCard=${setSelectedId}
          onCardDragStart=${handleCardDragStart}
          clarifyMessage=${clarifyMessage}
          onClarifyMessageChange=${setClarifyMessage}
          onClarifySend=${handleClarifySend}
          onConfirmSend=${handleConfirmSend}
          progressState=${progressState}
        />
        <${ReactFlowProvider}>
          <${FlowCanvas}
            stage=${stage}
            selectedId=${selectedId}
            onDropCard=${handleCardDrop}
            onKeepWorking=${handleKeepWorking}
            onPerfect=${handlePerfect}
            onShowPlan=${handleShowPlan}
          />
        </${ReactFlowProvider}>
      </div>
      <${AppFooter} />
    </div>
  `;
}
