import React, { useState } from 'react';

interface Card {
  id: string;
  text: string;
}

type ColumnId = 'todo' | 'inProgress' | 'done';

const COLUMN_TITLES: Record<ColumnId, string> = {
  todo: 'To do',
  inProgress: 'In progress',
  done: 'Done',
};

const initialBoard: Record<ColumnId, Card[]> = {
  todo: [
    { id: 'card-1', text: 'Write test plan' },
    { id: 'card-2', text: 'Set up CI pipeline' },
    { id: 'card-3', text: 'Review flaky tests' },
  ],
  inProgress: [{ id: 'card-4', text: 'Automate checkout flow' }],
  done: [{ id: 'card-5', text: 'Set up Playwright project' }],
};

export default function DragDropPage() {
  const [board, setBoard] = useState(initialBoard);
  const [draggingCard, setDraggingCard] = useState<{ id: string; from: ColumnId } | null>(null);
  const [overColumn, setOverColumn] = useState<ColumnId | null>(null);

  const handleDragStart = (card: Card, from: ColumnId) => {
    setDraggingCard({ id: card.id, from });
  };

  const handleDrop = (to: ColumnId) => {
    if (!draggingCard) return;
    setOverColumn(null);
    if (draggingCard.from === to) return;

    setBoard((prev) => {
      const fromCards = prev[draggingCard.from];
      const card = fromCards.find((c) => c.id === draggingCard.id);
      if (!card) return prev;
      return {
        ...prev,
        [draggingCard.from]: fromCards.filter((c) => c.id !== draggingCard.id),
        [to]: [...prev[to], card],
      };
    });
    setDraggingCard(null);
  };

  const moveWithButtons = (card: Card, from: ColumnId, direction: 1 | -1) => {
    const order: ColumnId[] = ['todo', 'inProgress', 'done'];
    const idx = order.indexOf(from);
    const nextIdx = idx + direction;
    if (nextIdx < 0 || nextIdx >= order.length) return;
    const to = order[nextIdx];
    setBoard((prev) => ({
      ...prev,
      [from]: prev[from].filter((c) => c.id !== card.id),
      [to]: [...prev[to], card],
    }));
  };

  return (
    <div data-testid="drag-drop-page">
      <div className="page-header">
        <div>
          <h2>Drag &amp; drop board</h2>
          <p>A kanban board using the native HTML5 drag-and-drop API, with button fallbacks for reliability.</p>
        </div>
      </div>

      <div className="dnd-board" data-testid="dnd-board">
        {(Object.keys(board) as ColumnId[]).map((colId) => (
          <div
            key={colId}
            className={`dnd-column ${overColumn === colId ? 'is-over' : ''}`}
            data-testid={`column-${colId}`}
            onDragOver={(e) => {
              e.preventDefault();
              setOverColumn(colId);
            }}
            onDragLeave={() => setOverColumn((c) => (c === colId ? null : c))}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(colId);
            }}
          >
            <div className="dnd-column__title">
              {COLUMN_TITLES[colId]} ({board[colId].length})
            </div>
            {board[colId].map((card) => (
              <div
                key={card.id}
                className="dnd-card"
                draggable
                data-testid={`card-${card.id}`}
                onDragStart={() => handleDragStart(card, colId)}
                onDragEnd={() => setOverColumn(null)}
              >
                <div>{card.text}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <button
                    className="btn btn--secondary btn--sm"
                    data-testid={`move-left-${card.id}`}
                    disabled={colId === 'todo'}
                    onClick={() => moveWithButtons(card, colId, -1)}
                  >
                    ←
                  </button>
                  <button
                    className="btn btn--secondary btn--sm"
                    data-testid={`move-right-${card.id}`}
                    disabled={colId === 'done'}
                    onClick={() => moveWithButtons(card, colId, 1)}
                  >
                    →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
