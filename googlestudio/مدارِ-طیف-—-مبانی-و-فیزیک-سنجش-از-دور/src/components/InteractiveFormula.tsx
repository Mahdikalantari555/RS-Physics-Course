import { useState } from 'react';
import { INTERACTIVE_FORMULAS, type FormulaToken } from '../data/interactiveFormulas';

interface InteractiveFormulaProps {
  formulaId: string;
  compact?: boolean;
}

function getTokenButtonStyle(token: FormulaToken, isSelected: boolean): string {
  if (isSelected) {
    return 'bg-sky-600 text-white border-sky-600 shadow-xs';
  }
  switch (token.kind) {
    case 'var':
      return 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100 hover:border-sky-300';
    case 'const':
      return 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100 hover:border-amber-300';
    case 'op':
      return 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200';
    default:
      return 'bg-white text-slate-600 border-transparent';
  }
}

export function InteractiveFormula({ formulaId, compact = false }: InteractiveFormulaProps) {
  const formula = INTERACTIVE_FORMULAS[formulaId];

  const clickableTokens = formula ? formula.tokens.filter((t) => t.clickable) : [];
  const [selectedTokenId, setSelectedTokenId] = useState<string>(
    clickableTokens[0]?.id || ''
  );

  if (!formula) {
    return null;
  }

  const activeToken =
    clickableTokens.find((t) => t.id === selectedTokenId) || clickableTokens[0] || null;

  return (
    <div
      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 space-y-3"
      data-testid={`interactive-formula-${formula.id}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold text-slate-800">
          {compact ? 'کالبدشکافی تعاملی فرمول' : formula.nameFa}
        </div>
        <div className="text-[11px] text-sky-700 font-medium">
          روی هر جزء فرمول کلیک کنید
        </div>
      </div>

      {/* Clickable Formula Tokens Bar (LTR for exact mathematical notation) */}
      <div
        dir="ltr"
        className="bg-white border border-slate-200 rounded-lg px-3 py-3 flex flex-wrap items-center justify-center gap-1.5"
        role="group"
        aria-label={`اجزای تعاملی ${formula.nameFa}`}
      >
        {formula.tokens.map((tok) => {
          if (!tok.clickable) {
            return (
              <span
                key={tok.id}
                className="font-mono-tech text-sm sm:text-base text-slate-500 px-0.5 select-none"
              >
                {tok.text}
                {tok.sup && <sup className="text-[10px]">{tok.sup}</sup>}
                {tok.sub && <sub className="text-[10px]">{tok.sub}</sub>}
              </span>
            );
          }

          const isSelected = activeToken?.id === tok.id;
          return (
            <button
              key={tok.id}
              type="button"
              onClick={() => setSelectedTokenId(tok.id)}
              aria-pressed={isSelected}
              aria-label={`بررسی ${tok.titleFa || tok.text}`}
              className={`font-mono-tech text-sm sm:text-base font-semibold px-2 py-1 rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${getTokenButtonStyle(
                tok,
                isSelected
              )}`}
            >
              {tok.text}
              {tok.sup && <sup className="text-[10px] ml-0.5">{tok.sup}</sup>}
              {tok.sub && <sub className="text-[10px] ml-0.5">{tok.sub}</sub>}
            </button>
          );
        })}
      </div>

      {/* Color Legend (Text-labeled, non-hue-only) */}
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
        <span>راهنمای اجزا:</span>
        <span className="text-sky-800 font-medium">■ متغیر</span>
        <span className="text-amber-800 font-medium">■ ثابت / ضریب</span>
        <span className="text-slate-700 font-medium">■ عملگر ریاضی</span>
      </div>

      {/* Active Token Breakdown Inspector */}
      {activeToken && (
        <div
          className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs"
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900 text-sm">{activeToken.titleFa}</span>
            {activeToken.unitOrValue && (
              <span
                dir="ltr"
                className="font-mono-tech text-[11px] font-medium text-sky-800 bg-sky-50 border border-sky-200 rounded px-2 py-0.5"
              >
                {activeToken.unitOrValue}
              </span>
            )}
          </div>

          {activeToken.meaningFa && (
            <p className="text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">چیست؟ </span>
              {activeToken.meaningFa}
            </p>
          )}

          {activeToken.mathRoleFa && (
            <p className="text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">نقش ریاضی: </span>
              {activeToken.mathRoleFa}
            </p>
          )}

          {activeToken.intuitionFa && (
            <p className="text-sky-900 bg-sky-50 border border-sky-100 rounded-md p-2 leading-relaxed">
              <span className="font-semibold">شهود کاربردی: </span>
              {activeToken.intuitionFa}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
