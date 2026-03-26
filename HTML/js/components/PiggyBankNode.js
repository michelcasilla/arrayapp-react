import { memo } from "https://esm.sh/react@18.3.1";
import { html } from "https://esm.sh/htm@3.1.1/react?deps=react@18.3.1";
import { Handle, Position } from "https://esm.sh/@xyflow/react@12.3.6?deps=react@18.3.1,react-dom@18.3.1";
import { FLOW_NODE_SUMMARY } from "../data/planOptions.js";

/**
 * Custom React Flow node — white goal card with piggy icon.
 */
export const PiggyBankNode = memo(function PiggyBankNode({ data }) {
  const title = data?.title ?? FLOW_NODE_SUMMARY.title;
  const dateRange = data?.dateRange ?? FLOW_NODE_SUMMARY.dateRange;

  return html`
    <div
      className="min-w-[300px] max-w-[340px] rounded-2xl border border-white/60 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(42,16,126,0.10)]"
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
      <div className="flex items-center gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white"
        >
          <img
            src="./assets/icon-home.svg"
            alt=""
            draggable=${false}
            className="h-14 w-14 select-none"
            style=${{ display: "block" }}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-[#2A107E]">${title}</p>
          <p className="text-sm italic text-[#795ADF]">${dateRange}</p>
        </div>
      </div>
    </div>
  `;
});
