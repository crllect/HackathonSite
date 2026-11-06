import { For, Show, type Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { BridgeKind } from "~/content";
import type { Bridge } from "~/lib/river";
import styles from "./River.module.css";

type Look = { height: number; deck: string; rail: string };

const LOOKS: Record<BridgeKind, Look> = {
  footbridge: { height: 22, deck: "#f5e7c8", rail: "#c9b48a" },
  brick: { height: 30, deck: "#cf5b3f", rail: "#f2b48f" },
  smoot: { height: 36, deck: "#c3c1d3", rail: "#efedf7" },
  longfellow: { height: 44, deck: "#aab6c9", rail: "#e8edf5" },
};

const INK = { stroke: "var(--ink)", "stroke-width": 2.4, "stroke-linejoin": "round" } as const;

const stepsAlong = (span: number, gap: number, inset = 12) =>
  Array.from({ length: Math.max(0, Math.floor((span - inset * 2) / gap) + 1) }, (_, index) => inset + index * gap);

const Plaque: Component<{ label: string; x: number; y: number }> = (props) => {
  const width = () => props.label.length * 7.8 + 28;
  return (
    <g transform={`translate(${props.x.toFixed(1)} ${props.y.toFixed(1)}) rotate(-1.5)`}>
      <path d={`M${-width() / 2 + 12} -18v6M${width() / 2 - 12} -18v6`} stroke="var(--ink)" stroke-width="2" />
      <rect x={-width() / 2} y="-13" width={width()} height="26" rx="8" fill="var(--paper)" {...INK} />
      <text class={styles.plaque} text-anchor="middle" dominant-baseline="central">
        {props.label}
      </text>
    </g>
  );
};

const Car: Component<{ y: number; span: number; color: string; reverse?: boolean; delay: number }> = (props) => (
  <g transform={`translate(4 ${props.y})`}>
    <g
      class={styles.drive}
      style={{
        "--span": `${props.span - 28}px`,
        "animation-direction": props.reverse ? "reverse" : "normal",
        "animation-delay": `${props.delay}s`,
      }}
    >
      <rect x="0" y="-5" width="18" height="10" rx="4" fill={props.color} {...INK} stroke-width="1.6" />
      <rect x="5" y="-3" width="7" height="6" rx="2" fill="#dff3ff" />
    </g>
  </g>
);

const Brick: Component<{ span: number; look: Look }> = (props) => (
  <>
    <rect width={props.span} height="6" rx="3" fill={props.look.rail} />
    <rect y={props.look.height - 6} width={props.span} height="6" rx="3" fill={props.look.rail} />
    <path d={`M12 ${props.look.height / 2}H${props.span - 12}`} stroke="var(--yellow)" stroke-width="2" stroke-dasharray="8 7" />
    <For each={stepsAlong(props.span, 38, 18)}>
      {(x) => <circle cx={x} cy="3" r="2.2" fill="var(--yellow)" stroke="var(--ink)" stroke-width="1" />}
    </For>
  </>
);

const Footbridge: Component<{ span: number; look: Look }> = (props) => (
  <>
    <For each={stepsAlong(props.span, 9)}>
      {(x) => (
        <>
          <circle cx={x} cy="4" r="1.7" fill={props.look.rail} />
          <circle cx={x} cy={props.look.height - 4} r="1.7" fill={props.look.rail} />
        </>
      )}
    </For>
    <path d={`M14 ${props.look.height / 2}H${props.span - 14}`} stroke="#e4d2ab" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round" />
  </>
);

const Smoot: Component<{ span: number; look: Look }> = (props) => (
  <>
    <rect y={props.look.height - 9} width={props.span} height="9" rx="4" fill={props.look.rail} />
    <path d={`M10 ${props.look.height / 2 - 4}H${props.span - 10}`} stroke="#fff" stroke-width="2" stroke-dasharray="9 8" />
    <For each={stepsAlong(props.span, 11)}>
      {(x, index) => (
        <path
          d={`M${x} ${props.look.height - 8}v${index() % 5 ? 3 : 6}`}
          stroke="var(--red)"
          stroke-width="1.4"
          stroke-linecap="round"
        />
      )}
    </For>
    <Car y={props.look.height * 0.27} span={props.span} color="var(--yellow)" delay={0} />
    <Car y={props.look.height * 0.27} span={props.span} color="var(--cyan)" delay={-3.4} />
    <Car y={props.look.height * 0.55} span={props.span} color="var(--purple)" delay={-1.6} reverse />
  </>
);

const Longfellow: Component<{ span: number; look: Look }> = (props) => {
  const mid = () => props.look.height / 2;
  return (
    <>
      <rect y={mid() - 7} width={props.span} height="14" fill="#f07c8c" />
      <path d={`M0 ${mid() - 3}H${props.span}M0 ${mid() + 3}H${props.span}`} stroke="var(--ink)" stroke-width="1.2" opacity="0.6" />
      <g transform={`translate(4 ${mid()})`}>
        <g class={styles.train} style={{ "--span": `${props.span - 60}px` }}>
          <rect x="0" y="-5.5" width="52" height="11" rx="4" fill="var(--red)" {...INK} stroke-width="1.8" />
          <For each={[6, 16, 26, 36]}>{(x) => <rect x={x} y="-2.5" width="6" height="5" rx="1.5" fill="#fff6e8" />}</For>
        </g>
      </g>
      <For each={[0.42, 0.58]}>
        {(fraction) => (
          <For each={[0, props.look.height]}>
            {(y) => (
              <g transform={`translate(${(props.span * fraction).toFixed(1)} ${y})`}>
                <circle r="11" fill="#ece6d6" {...INK} />
                <circle r="6" fill="#d6cbb2" stroke="var(--ink)" stroke-width="1.4" />
                <circle cx="-3" cy="-3" r="2" fill="#fff" />
              </g>
            )}
          </For>
        )}
      </For>
    </>
  );
};

const DETAILS: Record<BridgeKind, Component<{ span: number; look: Look }>> = {
  brick: Brick,
  footbridge: Footbridge,
  smoot: Smoot,
  longfellow: Longfellow,
};

export const BridgeArt: Component<{ bridge: Bridge }> = (props) => {
  const look = () => LOOKS[props.bridge.kind];
  const span = () => props.bridge.x2 - props.bridge.x1;
  const top = () => props.bridge.y - look().height / 2;

  return (
    <g transform={`translate(${props.bridge.x1.toFixed(1)} ${top().toFixed(1)})`}>
      <rect x="10" y={look().height - 2} width={Math.max(0, span() - 20)} height="13" rx="6" fill="#13304f" opacity="0.22" />
      <Show when={props.bridge.kind === "brick"}>
        <For each={[0.25, 0.5, 0.75]}>
          {(fraction) => (
            <path
              d={`M${span() * fraction - 9} 2L${span() * fraction} -11L${span() * fraction + 9} 2Z`}
              fill={look().deck}
              {...INK}
            />
          )}
        </For>
      </Show>
      <rect x="-6" y="-7" width="28" height={look().height + 14} rx="7" fill="#ddd2b9" {...INK} />
      <rect x={span() - 22} y="-7" width="28" height={look().height + 14} rx="7" fill="#ddd2b9" {...INK} />
      <rect width={span()} height={look().height} rx="8" fill={look().deck} {...INK} />
      <Dynamic component={DETAILS[props.bridge.kind]} span={span()} look={look()} />
      <rect width={span()} height={look().height} rx="8" fill="none" {...INK} />
      <Plaque label={props.bridge.label} x={props.bridge.cx - props.bridge.x1} y={look().height + 24} />
    </g>
  );
};
