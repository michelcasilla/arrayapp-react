import { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { html } from "https://esm.sh/htm@3.1.1/react?deps=react@18.3.1";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Position,
  Handle,
  useNodesState,
  useEdgesState,
} from "https://esm.sh/@xyflow/react@12.3.6?deps=react@18.3.1,react-dom@18.3.1";
import { PiggyBankNode } from "./PiggyBankNode.js";
import { FLOW_NODE_SUMMARY } from "../data/planOptions.js";
import { PLAN_OPTION_CARDS } from "../data/planOptions.js";

function GrabHand() {
  return html`
    <div
      className="pointer-events-none absolute right-[140px] top-[140px] z-10 opacity-80"
      aria-hidden="true"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        className="text-[#2A107E]"
      >
        <path
          d="M8 10V7a2 2 0 114 0v3m-4 0V6a2 2 0 114 0v4m-4 0V8a2 2 0 114 0v2m8 2v1l2 6H9l-3-7a2 2 0 012-2h6z"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  `;
}

function TreeCardNode({ data }) {
  const card = data.card;
  const faded = !!data.faded;
  return html`
    <div
      className=${`w-[270px] rounded-2xl border border-[#795ADF]/75 bg-white px-4 py-3 text-[#2A107E] shadow-sm transition ${
        faded ? "opacity-35" : ""
      }`}
    >
      <${Handle}
        type="target"
        position=${Position.Top}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <${Handle}
        type="source"
        position=${Position.Bottom}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <p className="line-clamp-3 text-[14px] font-semibold leading-snug">${card.mainText}</p>
      <div className="mt-3 space-y-1 text-[12px]">
        <p className="truncate"><span className="text-[#52EE9B]">●</span> ${card.success}</p>
        <p className="truncate"><span className="text-[#FF625A]">●</span> ${card.constraint}</p>
        <p className="truncate"><span className="text-[#02BACE]">●</span> ${card.tradeoff}</p>
      </div>
    </div>
  `;
}

function PuNode() {
  return html`
    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#FF5EA8] shadow">
      <${Handle}
        type="target"
        position=${Position.Top}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <${Handle}
        type="source"
        position=${Position.Bottom}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <img src="./assets/icon-flag.svg" alt="" className="h-[26px] w-[26px]" draggable=${false} />
    </div>
  `;
}

function BasicsLabelNode() {
  return html`
    <div className="rounded-full border-[2.5px] border-[#6952B8] bg-white/95 px-6 py-1.5 text-[20px] font-semibold text-[#2A107E] shadow-sm">
      <${Handle}
        type="target"
        position=${Position.Top}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <${Handle}
        type="source"
        position=${Position.Bottom}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      The Basics (5)
    </div>
  `;
}

function KeyPieceIconNode() {
  return html`
    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#22C9BD] shadow">
      <${Handle}
        type="target"
        position=${Position.Top}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <${Handle}
        type="source"
        position=${Position.Bottom}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <img src="./assets/icon-key.svg" alt="" className="h-[26px] w-[26px]" draggable=${false} />
    </div>
  `;
}

function KeyPiecesLabelNode() {
  return html`
    <div className="rounded-full border-[2.5px] border-[#6952B8] bg-white/95 px-6 py-1.5 text-[20px] leading-none text-[#2A107E] shadow-sm">
      <${Handle}
        type="target"
        position=${Position.Top}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <${Handle}
        type="source"
        position=${Position.Bottom}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <span className="inline-flex items-end gap-1">
        <span className="animate-pulse">Filling in the key pieces</span>
        <span className="inline-block animate-bounce" style=${{ animationDelay: "0ms" }}>.</span>
        <span className="inline-block animate-bounce" style=${{ animationDelay: "180ms" }}>.</span>
        <span className="inline-block animate-bounce" style=${{ animationDelay: "360ms" }}>.</span>
      </span>
    </div>
  `;
}

function ExpertsNode() {
  const faces = [
    "./assets/ellipse-19.svg",
    "./assets/ellipse-20.svg",
    "./assets/ellipse-21.svg",
    "./assets/ellipse-18.svg",
  ];
  return html`
    <div className="w-[350px]">
      <${Handle}
        type="target"
        position=${Position.Top}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <div className="flex justify-center">
        ${faces.map(
          (src, idx) => html`
            <img
              key=${src}
              src=${src}
              alt=""
              className=${`h-[94px] w-[94px] shadow ${idx > 0 ? "-ml-4" : ""}`}
              draggable=${false}
            />
          `,
        )}
      </div>
      <p className="mt-3 text-center text-[18px] leading-tight text-[#2A107E]">Our Experts are at work...</p>
    </div>
  `;
}

function KeyPiecesPanelNode({ data }) {
  const points = [
    "Validated Niche & Offer",
    "Lean Production Engine",
    "Customer Acquisition & Retention System",
    "Cashflow & Risk Management",
    "Brand & Process Assets",
  ];
  return html`
    <div className="w-[560px] rounded-3xl border-[3px] border-[#6952B8] bg-white/90 px-6 py-5 shadow-md">
      <${Handle}
        type="target"
        position=${Position.Top}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <h3 className="text-[22px] font-bold leading-none text-[#2A107E]">Key Pieces</h3>
      <p className="mt-2 text-[14px] text-[#2A107E]/80">
        The major building blocks of your Plan with the guidance to move you forward.
      </p>
      <ul className="mt-4 space-y-1.5 text-[12px] text-[#2A107E]/90">
        ${points.map(
          (p) => html`<li key=${p}><span className="mr-2 text-[#795ADF]">●</span>${p}</li>`,
        )}
      </ul>
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick=${data?.onShowPlan}
          className="rounded-full bg-[#21C9A2] px-6 py-2 text-[16px] font-semibold text-white"
        >
          Show me the Plan!
        </button>
        <button
          type="button"
          onClick=${data?.onKeepWorking}
          className="rounded-full border-2 border-[#B9A7E9] px-6 py-2 text-[16px] font-semibold text-[#6B58B8]"
        >
          Let’s keep working on these
        </button>
      </div>
    </div>
  `;
}

function BasicsPanelNode({ data }) {
  const points = [
    "Dedicate 10–15 focused hours each week to the screenprinting business",
    "Focus on local custom clients as the first primary customer type",
    "Print in-house using lean, entry-level screenprinting gear",
    "Use Etsy plus social media as the main initial sales channels",
    "Print primarily on-demand instead of holding pre-printed inventory",
  ];
  return html`
    <div className="w-[560px] rounded-3xl border-[3px] border-[#6952B8] bg-white/90 p-5 shadow-md">
      <${Handle}
        type="target"
        position=${Position.Top}
        isConnectable=${false}
        style=${{ opacity: 0, width: 8, height: 8, background: "transparent", border: "none" }}
      />
      <h3 className="text-[22px] font-bold text-[#2A107E]">The Basics (5)</h3>
      <ul className="mt-3 space-y-1.5 text-[12px] text-[#2A107E]/90">
        ${points.map(
          (p) => html`<li key=${p}><span className="mr-2 text-[#795ADF]">●</span>${p}</li>`,
        )}
      </ul>
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick=${data?.onPerfect}
          className="rounded-full bg-[#21C9A2] px-6 py-2 text-[16px] font-semibold text-white"
        >
          Yes, this is perfect!
        </button>
        <button
          type="button"
          onClick=${data?.onKeepWorking}
          className="rounded-full border-2 border-[#B9A7E9] px-6 py-2 text-[16px] font-semibold text-[#6B58B8]"
        >
          Let’s keep working on these
        </button>
      </div>
    </div>
  `;
}

function PlanScreen() {
  const [view, setView] = useState("by-key-pieces");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState("validated");
  const actions = [
    "Design out Invitations",
    "Write a short invite message with RSVP deadline",
    "Track RSVPs and update the guest list",
    "Track RSVPs and update the guest list",
  ];
  const collapsedSections = [
    "Lean Production Engine (3)",
    "Customer Acquisition & Retention System (12)...",
    "Cashflow & Risk Management (4)",
    "Brand & Process Assets (9)",
  ];

  return html`
    <div className="mx-auto h-full w-full max-w-[1000px] overflow-hidden px-8 pt-5 pb-5 text-[#2A107E]">
      <div className="mb-3 flex items-center justify-between">
        <button className="rounded-full border border-[#BDAEEA] bg-white/70 px-3 py-1 text-[12px] font-semibold text-[#7A63CF]">
          ← Back to Workspace
        </button>
      </div>

      <div className="relative rounded-2xl border border-[#BDAEEA] bg-white/70 px-4 py-2 shadow-sm">
        <button
          className="absolute right-3 top-2 text-base text-[#7A63CF]"
          onClick=${() => setMenuOpen((v) => !v)}
        >
          •••
        </button>
        <div className="flex items-center gap-4">
          <img src="./assets/icon-home.svg" alt="" className="h-[62px] w-[62px]" />
          <div>
            <h3 className="text-[14px] font-bold leading-none">Side Screenprinting Hustle</h3>
            <p className="mt-1 text-[12px] text-[#7A63CF]">March - December 2026</p>
            <p className="mt-1 text-[12px] text-[#2A107E]/80">
              I use the first 12 months to validate a viable, scalable screenprinting...
            </p>
          </div>
        </div>
        ${menuOpen
          ? html`
              <div className="absolute right-2 top-10 z-10 w-[190px] rounded-xl border border-[#BDAEEA] bg-white shadow-lg">
                <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]">
                  <img src="./assets/icon-edit-plan-information.svg" alt="" className="h-3.5 w-3.5" />
                  <span>Edit Plan Information</span>
                </button>
                <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]">
                  <img src="./assets/icon-clone-plan.svg" alt="" className="h-3.5 w-3.5" />
                  <span>Clone Plan</span>
                </button>
                <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]">
                  <img src="./assets/icon-delete-plan.svg" alt="" className="h-3.5 w-3.5" />
                  <span>Delete Plan</span>
                </button>
              </div>
            `
          : null}
      </div>

      <div className="mt-3 grid grid-cols-[1fr_270px] gap-3">
        <div className="rounded-2xl border border-[#BDAEEA] bg-white/70 p-3 shadow-sm">
          <h4 className="text-[16px] font-bold leading-none text-[#2D1C73]">Key Pieces (5)</h4>
          <ul className="mt-2 space-y-1 text-[12px] text-[#2A107E]/90">
            <li>● Validated Niche & Offer</li>
            <li>● Lean Production Engine</li>
            <li>● Customer Acquisition & Retention System</li>
            <li>● Cashflow & Risk Management</li>
            <li>● Brand & Process Assets</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[#BDAEEA] bg-white/70 p-3 shadow-sm">
          <h4 className="text-[16px] font-bold leading-none text-[#2D1C73]">Ready to Use (4)</h4>
          <ul className="mt-2 space-y-1.5 leading-tight">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#7A63CF]">
                <img src="./assets/icon-download-calendar-ics.svg" alt="" className="h-3 w-3" />
              </span>
              <span className="text-[12px]">Download Calendar (ics.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#7A63CF]">
                <img src="./assets/icon-email-school-program.svg" alt="" className="h-3 w-3" />
              </span>
              <span className="text-[12px]">Email to daughter's school/program</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#7A63CF]">
                <img src="./assets/icon-short-message-husband.svg" alt="" className="h-3 w-3" />
              </span>
              <span className="text-[12px]">Short Message to Send Your Husband</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#7A63CF]">
                <img src="./assets/icon-download-pdf-plan.svg" alt="" className="h-3 w-3" />
              </span>
              <span className="text-[12px]">Download PDF of Plan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-end justify-between">
          <div>
            <h4 className="text-[16px] font-bold leading-none text-[#2D1C73]">Put your plan to work!</h4>
            <p className="mt-0.5 text-[12px] text-[#2A107E]/85">All actions you need to get complete this plan.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px]">View:</span>
            <select
              value=${view}
              onChange=${(e) => setView(e.target.value)}
              className="rounded-full border border-[#BDAEEA] bg-white px-3 py-1 text-[12px] text-[#2A107E]"
            >
              <option value="by-key-pieces">By Key Pieces</option>
              <option value="all-actions">All Actions</option>
            </select>
          </div>
        </div>

        ${view === "all-actions"
          ? html`
              <div className="mt-2 rounded-2xl border border-[#BDAEEA] bg-white/70 p-3 shadow-sm">
                <h5 className="text-[14px] font-bold text-[#5C47B5]">All Actions</h5>
                <div className="mt-2 divide-y divide-[#E5DBFA]">
                  ${[...actions, ...actions, ...actions.slice(0, 2)].map(
                    (a, idx) => html`
                      <div key=${`all-${idx}`} className="flex items-center justify-between py-1.5">
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-5 rounded-full border-2 border-dashed border-[#8D72D8]/70"></div>
                          <div>
                            <p className="text-[12px] leading-tight">${a}</p>
                            <p className="text-[11px] italic text-[#7A63CF]">Nov 19, 2025</p>
                          </div>
                        </div>
                        <img src="./assets/icon-task-right.svg" alt="" className="h-5 w-5" />
                      </div>
                    `,
                  )}
                </div>
              </div>
            `
          : html`
              <div className="mt-2 space-y-1.5">
                ${[
                  { key: "validated", title: "Validated Niche & Offer (4)" },
                  ...collapsedSections.map((t) => ({ key: t, title: t })),
                ].map(
                  (section) => html`
                    <div key=${section.key} className="relative overflow-hidden rounded-xl border border-[#BDAEEA] bg-white/70">
                      <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex w-8 items-start justify-center rounded-r-xl bg-[#7A63CF] pt-2">
                        <img
                          src="./assets/icon-arrow-accordion.svg"
                          alt=""
                          className=${`h-3 w-3 transition-transform ${openSection === section.key ? "rotate-90" : ""}`}
                        />
                      </div>
                      <button
                        className="flex w-full items-center justify-between pr-8 text-left"
                        onClick=${() => setOpenSection((s) => (s === section.key ? "" : section.key))}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2">
                          <span className="h-5 w-1.5 rounded bg-[#7A63CF]"></span>
                          <p className="truncate text-[13px] font-semibold text-[#5C47B5]">${section.title}</p>
                        </div>
                      </button>

                      ${openSection === section.key
                        ? html`
                            <div className="border-t border-[#E5DBFA] px-4 py-2 pr-10">
                              ${section.key === "validated"
                                ? html`
                                    <p className="text-[12px] leading-tight text-[#2A107E]/85">
                                      Define and test a focused combination of customer segment, use-case, and screenprinted product that can predictably generate $2,000+/month in revenue with minimal upfront risk....
                                    </p>
                                  `
                                : null}
                              <div className="mt-2 divide-y divide-[#E5DBFA]">
                                ${actions.slice(0, section.key === "validated" ? 4 : 3).map(
                                  (a, idx) => html`
                                    <div key=${`${section.key}-${idx}`} className="flex items-center justify-between py-1.5">
                                      <div className="flex items-center gap-3">
                                        <div className="h-5 w-5 rounded-full border-2 border-dashed border-[#8D72D8]/70"></div>
                                        <div>
                                          <p className="text-[12px] leading-tight">${a}</p>
                                          <p className="text-[11px] italic text-[#7A63CF]">Nov 19, 2025</p>
                                        </div>
                                      </div>
                                      <img src="./assets/icon-task-right.svg" alt="" className="h-5 w-5" />
                                    </div>
                                  `,
                                )}
                              </div>
                            </div>
                          `
                        : null}
                    </div>
                  `,
                )}
              </div>
            `}
      </div>
    </div>
  `;
}

export function FlowCanvas({ stage, selectedId, onDropCard, onKeepWorking, onPerfect, onShowPlan }) {
  const nodeTypes = useMemo(() => {
    return {
      piggyBank: PiggyBankNode,
      treeCard: TreeCardNode,
      puNode: PuNode,
      basicsLabel: BasicsLabelNode,
      keyPieceIcon: KeyPieceIconNode,
      keyPiecesLabel: KeyPiecesLabelNode,
      expertsNode: ExpertsNode,
      keyPiecesPanel: KeyPiecesPanelNode,
      basicsPanel: BasicsPanelNode,
    };
  }, []);

  const selectedCard = useMemo(
    () => PLAN_OPTION_CARDS.find((c) => c.id === selectedId) ?? PLAN_OPTION_CARDS[1],
    [selectedId],
  );
  const sideCards = useMemo(
    () => PLAN_OPTION_CARDS.filter((c) => c.id !== selectedCard.id),
    [selectedCard.id],
  );
  const showTree = stage !== "define";
  const showLoading = stage === "loading";
  const showConfirmPanel = stage === "confirm";
  const showKeyPiecesLoading = stage === "key-pieces-loading";
  const showKeyPiecesPanel = stage === "key-pieces";
  const showHand = stage !== "define" && !showLoading;

  const graph = useMemo(() => {
    const nodes = [
      {
        id: "goal-root",
        type: "piggyBank",
        position: { x: 520, y: 40 },
        data: {
          title: FLOW_NODE_SUMMARY.title,
          dateRange: FLOW_NODE_SUMMARY.dateRange,
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
    ];
    const edges = [];

    if (!showTree) return { nodes, edges };

    nodes.push(
      {
        id: "selected-card",
        type: "treeCard",
        position: { x: 530, y: 235 },
        data: { card: selectedCard, faded: false },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
      {
        id: "left-card",
        type: "treeCard",
        position: { x: 220, y: 235 },
        data: { card: sideCards[0], faded: true },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
      {
        id: "right-card",
        type: "treeCard",
        position: { x: 840, y: 235 },
        data: { card: sideCards[1], faded: true },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
      {
        id: "pu",
        type: "puNode",
        position: { x: 665, y: 475 },
        data: {},
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
      {
        id: "basics-label",
        type: "basicsLabel",
        position: { x: 615, y: 560 },
        data: {},
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
    );

    edges.push(
      {
        id: "e-root-left",
        source: "goal-root",
        target: "left-card",
        sourceHandle: null,
        targetHandle: null,
        type: "smoothstep",
        style: { stroke: "#8D72D8", strokeWidth: 2.5 },
      },
      {
        id: "e-root-selected",
        source: "goal-root",
        target: "selected-card",
        type: "smoothstep",
        style: { stroke: "#8D72D8", strokeWidth: 2.5 },
      },
      {
        id: "e-root-right",
        source: "goal-root",
        target: "right-card",
        type: "smoothstep",
        style: { stroke: "#8D72D8", strokeWidth: 2.5 },
      },
      {
        id: "e-selected-pu",
        source: "selected-card",
        target: "pu",
        type: "smoothstep",
        style: { stroke: "#8D72D8", strokeWidth: 2.5 },
      },
      {
        id: "e-pu-basics",
        source: "pu",
        target: "basics-label",
        type: "smoothstep",
        style: { stroke: "#8D72D8", strokeWidth: 2.5 },
      },
    );

    if (showConfirmPanel) {
      nodes.push({
        id: "basics-panel",
        type: "basicsPanel",
        position: { x: 460, y: 610 },
        data: { onKeepWorking, onPerfect },
        draggable: true,
      });
      edges.push({
        id: "e-label-panel",
        source: "basics-label",
        target: "basics-panel",
        type: "smoothstep",
          style: { stroke: "#8D72D8", strokeWidth: 2.5 },
      });
    }

    if (showKeyPiecesLoading) {
      nodes.push(
        {
          id: "key-piece-icon",
          type: "keyPieceIcon",
          position: { x: 665, y: 660 },
          data: {},
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "key-pieces-label",
          type: "keyPiecesLabel",
          position: { x: 540, y: 750 },
          data: {},
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "experts",
          type: "expertsNode",
          position: { x: 520, y: 845 },
          data: {},
          targetPosition: Position.Top,
          draggable: true,
        },
      );
      edges.push(
        {
          id: "e-basics-keyicon",
          source: "basics-label",
          target: "key-piece-icon",
          type: "smoothstep",
          style: { stroke: "#8D72D8", strokeWidth: 2.5 },
        },
        {
          id: "e-keyicon-keylabel",
          source: "key-piece-icon",
          target: "key-pieces-label",
          type: "smoothstep",
          style: { stroke: "#8D72D8", strokeWidth: 2.5 },
        },
        {
          id: "e-keylabel-experts",
          source: "key-pieces-label",
          target: "experts",
          type: "smoothstep",
          style: { stroke: "#8D72D8", strokeWidth: 2.5 },
        },
      );
    }

    if (showKeyPiecesPanel) {
      nodes.push(
        {
          id: "key-piece-icon",
          type: "keyPieceIcon",
          position: { x: 665, y: 660 },
          data: {},
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
          draggable: true,
        },
        {
          id: "key-pieces-panel",
          type: "keyPiecesPanel",
          position: { x: 330, y: 730 },
          data: { onKeepWorking, onShowPlan },
          targetPosition: Position.Top,
          draggable: true,
        },
      );
      edges.push(
        {
          id: "e-basics-keyicon-panel",
          source: "basics-label",
          target: "key-piece-icon",
          type: "smoothstep",
          style: { stroke: "#8D72D8", strokeWidth: 2.5 },
        },
        {
          id: "e-keyicon-panel",
          source: "key-piece-icon",
          target: "key-pieces-panel",
          type: "smoothstep",
          style: { stroke: "#8D72D8", strokeWidth: 2.5 },
        },
      );
    }

    return { nodes, edges };
  }, [
    selectedCard.id,
    showTree,
    showConfirmPanel,
    showKeyPiecesLoading,
    showKeyPiecesPanel,
    onKeepWorking,
    onPerfect,
  ]);

  function handleDrop(event) {
    event.preventDefault();
    if (stage !== "define") return;
    const cardId =
      event.dataTransfer.getData("application/x-array-card") ||
      event.dataTransfer.getData("text/plain");
    if (cardId) onDropCard(cardId);
  }

  function handleDragOver(event) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);

  useEffect(() => {
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [stage, selectedCard.id, showConfirmPanel, showKeyPiecesLoading, showKeyPiecesPanel, setEdges, setNodes]);

  if (stage === "the-plan") {
    return html`
      <main className="array-flow-wrap relative flex h-full min-h-0 min-w-0 flex-1 flex-col bg-[#EADFFF]">
        <div className="pointer-events-none absolute right-6 top-5 z-20">
          <button
            type="button"
            className="pointer-events-auto rounded-xl bg-[#2A107E] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-95"
          >
            Log in
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          <${PlanScreen} />
        </div>
      </main>
    `;
  }

  return html`
    <main
      className="array-flow-wrap relative flex h-full min-h-0 min-w-0 flex-1 flex-col bg-[#EADFFF]"
      onDragOver=${handleDragOver}
      onDrop=${handleDrop}
    >
      <div className="pointer-events-none absolute right-6 top-5 z-20">
        <button
          type="button"
          className="pointer-events-auto rounded-xl bg-[#2A107E] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-95"
        >
          Log in
        </button>
      </div>
      ${null}

      <div className="relative min-h-0 flex-1">
        <${ReactFlow}
          nodes=${nodes}
          edges=${edges}
          onNodesChange=${onNodesChange}
          onEdgesChange=${onEdgesChange}
          nodeTypes=${nodeTypes}
          fitView=${false}
          panOnDrag=${true}
          zoomOnScroll=${true}
          zoomOnPinch=${true}
          panOnScroll=${false}
          selectionOnDrag=${false}
          nodesDraggable=${true}
          nodesConnectable=${false}
          elementsSelectable=${true}
          proOptions=${{ hideAttribution: true }}
          minZoom=${0.4}
          maxZoom=${1.8}
          defaultViewport=${{ x: 0, y: 0, zoom: 1 }}
          defaultEdgeOptions=${{
            type: "smoothstep",
            style: { stroke: "#8D72D8", strokeWidth: 2.5 },
          }}
        >
          <${Background}
            id="array-dots"
            variant=${BackgroundVariant.Dots}
            gap=${18}
            size=${1.5}
            color="#795ADF"
          />
          <${MiniMap}
            position="bottom-left"
            maskStrokeWidth=${2}
            className="!m-4 overflow-hidden rounded-lg border border-purple-200/80 bg-white/50 shadow-md !w-[120px] !h-[88px]"
            pannable=${false}
            zoomable=${false}
          />
          <${Controls}
            position="bottom-right"
            className="!m-4 overflow-hidden rounded-lg border border-purple-200/80 !shadow-md"
            showInteractive=${false}
          />
        </${ReactFlow}>
      </div>

      ${showLoading
        ? html`
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#2A107E]/75">
              <img src="./assets/logo-dots.svg" alt="" className="h-24 w-24 rounded-2xl bg-white p-2" />
              <p className="mt-4 text-6xl font-bold text-white">Loading...</p>
            </div>
          `
        : null}
    </main>
  `;
}
