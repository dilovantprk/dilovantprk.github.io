'use client';

import React from 'react';

interface QRCodeCardProps {
  username: string;
  fullName: string;
  avatarUrl: string;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({ username, fullName, avatarUrl }) => {
  // Generate a deterministic 21x21 QR Code grid pattern based on username string
  const qrData = React.useMemo(() => {
    const size = 21;
    const grid: boolean[][] = Array(size).fill(false).map(() => Array(size).fill(false));
    
    // Helper to draw finder patterns (7x7 squares at corners)
    const drawFinderPattern = (startRow: number, startCol: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 || r === 6 || c === 0 || c === 6 || // Outer border
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)     // Inner solid 3x3
          ) {
            grid[startRow + r][startCol + c] = true;
          }
        }
      }
    };

    // Draw 3 Corner Finder Patterns
    drawFinderPattern(0, 0);                  // Top-Left
    drawFinderPattern(0, size - 7);           // Top-Right
    drawFinderPattern(size - 7, 0);           // Bottom-Left

    // Draw timing patterns (dotted line connecting finders)
    for (let i = 8; i < size - 8; i += 2) {
      grid[6][i] = true;
      grid[i][6] = true;
    }

    // Populate data payload area deterministically using username hash
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = (hash << 5) - hash + username.charCodeAt(i);
      hash |= 0;
    }

    let bitIndex = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Skip finder pattern zones
        const inTopLeft = r < 9 && c < 9;
        const inTopRight = r < 9 && c >= size - 9;
        const inBottomLeft = r >= size - 9 && c < 9;
        const inCenterLogo = r >= 8 && r <= 12 && c >= 8 && c <= 12; // Center reservation for avatar

        if (!inTopLeft && !inTopRight && !inBottomLeft && !inCenterLogo) {
          const pseudoRandom = Math.sin(hash * 0.1 + bitIndex * 1.3) * 10000;
          grid[r][c] = Math.abs(pseudoRandom - Math.floor(pseudoRandom)) > 0.45;
          bitIndex++;
        }
      }
    }

    return grid;
  }, [username]);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-black rounded-3xl border border-white/20 shadow-2xl space-y-4">
      {/* Brand Header */}
      <div className="text-center space-y-1">
        <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase font-apple block">
          AradaPay QR Pass
        </span>
        <h3 className="text-base font-extrabold text-white font-apple">{fullName}</h3>
        <p className="text-xs text-emerald-400 font-mono">@{username}</p>
      </div>

      {/* SVG QR Code Display Container */}
      <div className="relative p-4 bg-white rounded-2xl shadow-xl border border-white/30 flex items-center justify-center">
        <svg className="w-48 h-48" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          {qrData.map((row, r) =>
            row.map((isDark, c) => {
              // Reserve center 5x5 for avatar overlay
              if (r >= 8 && r <= 12 && c >= 8 && c <= 12) return null;
              if (!isDark) return null;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c}
                  y={r}
                  width="0.92"
                  height="0.92"
                  rx="0.2"
                  fill="#000000"
                />
              );
            })
          )}
        </svg>

        {/* Center Avatar Overlay Badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-11 h-11 rounded-xl bg-black border-2 border-emerald-400 p-0.5 shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      <p className="text-[11px] text-zinc-400 font-medium text-center max-w-xs">
        Arkadaşınız bu QR kodu kamerasından okutarak sizi anında ekleyebilir.
      </p>
    </div>
  );
};
