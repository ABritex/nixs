type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

export interface GridOffset {
    x: number;
    y: number;
}

export interface GridConfig {
    direction: 'diagonal' | 'up' | 'right' | 'down' | 'left';
    speed: number;
    borderColor: CanvasStrokeStyle;
    squareSize: number;
    hoverFillColor: CanvasStrokeStyle;
    shape: 'square' | 'hexagon' | 'circle' | 'triangle';
    hoverTrailAmount: number;
}

export class GridDrawer {
    private ctx: CanvasRenderingContext2D;
    private config: GridConfig;
    private gridOffset: GridOffset = { x: 0, y: 0 };
    private hoveredSquare: GridOffset | null = null;
    private trailCells: GridOffset[] = [];
    private cellOpacities: Map<string, number> = new Map();

    constructor(ctx: CanvasRenderingContext2D, config: GridConfig) {
        this.ctx = ctx;
        this.config = config;
    }

    updateConfig(config: Partial<GridConfig>) {
        this.config = { ...this.config, ...config };
    }

    resize(canvas: HTMLCanvasElement): { cols: number; rows: number } {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const { squareSize, shape } = this.config;
        const isHex = shape === 'hexagon';
        const isTri = shape === 'triangle';
        const hexHoriz = squareSize * 1.5;
        const hexVert = squareSize * Math.sqrt(3);

        if (isHex) {
            return {
                cols: Math.ceil(canvas.width / hexHoriz) + 3,
                rows: Math.ceil(canvas.height / hexVert) + 3,
            };
        }
        if (isTri) {
            return {
                cols: Math.ceil(canvas.width / (squareSize / 2)) + 4,
                rows: Math.ceil(canvas.height / squareSize) + 4,
            };
        }
        return {
            cols: Math.ceil(canvas.width / squareSize) + 3,
            rows: Math.ceil(canvas.height / squareSize) + 3,
        };
    }

    private drawHex(cx: number, cy: number, size: number) {
        const { ctx } = this;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            ctx.lineTo(cx + size * Math.cos(angle), cy + size * Math.sin(angle));
        }
        ctx.closePath();
    }

    private drawCircle(cx: number, cy: number, size: number) {
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
        this.ctx.closePath();
    }

    private drawTriangle(cx: number, cy: number, size: number, flip: boolean) {
        const { ctx } = this;
        ctx.beginPath();
        if (flip) {
            ctx.moveTo(cx, cy + size / 2);
            ctx.lineTo(cx + size / 2, cy - size / 2);
            ctx.lineTo(cx - size / 2, cy - size / 2);
        } else {
            ctx.moveTo(cx, cy - size / 2);
            ctx.lineTo(cx + size / 2, cy + size / 2);
            ctx.lineTo(cx - size / 2, cy + size / 2);
        }
        ctx.closePath();
    }

    private updateCellOpacities() {
        const { hoveredSquare, trailCells, cellOpacities, config } = this;
        const targets = new Map<string, number>();

        if (hoveredSquare) {
            targets.set(`${hoveredSquare.x},${hoveredSquare.y}`, 1);
        }

        if (config.hoverTrailAmount > 0) {
            for (let i = 0; i < trailCells.length; i++) {
                const t = trailCells[i];
                const key = `${t.x},${t.y}`;
                if (!targets.has(key)) {
                    targets.set(key, (trailCells.length - i) / (trailCells.length + 1));
                }
            }
        }

        for (const [key] of targets) {
            if (!cellOpacities.has(key)) {
                cellOpacities.set(key, 0);
            }
        }

        for (const [key, opacity] of cellOpacities) {
            const target = targets.get(key) || 0;
            const next = opacity + (target - opacity) * 0.15;
            if (next < 0.005) {
                cellOpacities.delete(key);
            } else {
                cellOpacities.set(key, next);
            }
        }
    }

    trackHover(mouseX: number, mouseY: number) {
        const { config, gridOffset } = this;
        const { shape, squareSize, hoverTrailAmount } = config;
        const isHex = shape === 'hexagon';
        const isTri = shape === 'triangle';
        const hexHoriz = squareSize * 1.5;
        const hexVert = squareSize * Math.sqrt(3);

        let col: number;
        let row: number;

        if (isHex) {
            const colShift = Math.floor(gridOffset.x / hexHoriz);
            const offsetX = ((gridOffset.x % hexHoriz) + hexHoriz) % hexHoriz;
            const offsetY = ((gridOffset.y % hexVert) + hexVert) % hexVert;
            const adjustedX = mouseX - offsetX;
            const adjustedY = mouseY - offsetY;
            col = Math.round(adjustedX / hexHoriz);
            const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
            row = Math.round((adjustedY - rowOffset) / hexVert);
        } else if (isTri) {
            const halfW = squareSize / 2;
            const offsetX = ((gridOffset.x % halfW) + halfW) % halfW;
            const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;
            col = Math.round((mouseX - offsetX) / halfW);
            row = Math.floor((mouseY - offsetY) / squareSize);
        } else {
            const offsetX = ((gridOffset.x % squareSize) + squareSize) % squareSize;
            const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;
            col = Math.floor((mouseX - offsetX) / squareSize);
            row = Math.floor((mouseY - offsetY) / squareSize);
        }

        if (!this.hoveredSquare || this.hoveredSquare.x !== col || this.hoveredSquare.y !== row) {
            if (this.hoveredSquare && hoverTrailAmount > 0) {
                this.trailCells.unshift({ ...this.hoveredSquare });
                if (this.trailCells.length > hoverTrailAmount) this.trailCells.length = hoverTrailAmount;
            }
            this.hoveredSquare = { x: col, y: row };
        }
    }

    clearHover() {
        const { config } = this;
        if (this.hoveredSquare && config.hoverTrailAmount > 0) {
            this.trailCells.unshift({ ...this.hoveredSquare });
            if (this.trailCells.length > config.hoverTrailAmount) this.trailCells.length = config.hoverTrailAmount;
        }
        this.hoveredSquare = null;
    }

    tick(canvas: HTMLCanvasElement) {
        const { config, gridOffset } = this;
        const { direction, speed, squareSize, shape } = config;
        const isHex = shape === 'hexagon';
        const isTri = shape === 'triangle';
        const hexHoriz = squareSize * 1.5;
        const hexVert = squareSize * Math.sqrt(3);

        const effectiveSpeed = Math.max(speed, 0.1);
        const wrapX = isHex ? hexHoriz * 2 : squareSize;
        const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

        switch (direction) {
            case 'right': gridOffset.x = (gridOffset.x - effectiveSpeed + wrapX) % wrapX; break;
            case 'left': gridOffset.x = (gridOffset.x + effectiveSpeed + wrapX) % wrapX; break;
            case 'up': gridOffset.y = (gridOffset.y + effectiveSpeed + wrapY) % wrapY; break;
            case 'down': gridOffset.y = (gridOffset.y - effectiveSpeed + wrapY) % wrapY; break;
            case 'diagonal':
                gridOffset.x = (gridOffset.x - effectiveSpeed + wrapX) % wrapX;
                gridOffset.y = (gridOffset.y - effectiveSpeed + wrapY) % wrapY;
                break;
        }

        this.updateCellOpacities();
        this.draw(canvas);
    }

    private draw(canvas: HTMLCanvasElement) {
        const { ctx, config, gridOffset, cellOpacities } = this;
        const { borderColor, hoverFillColor, squareSize, shape } = config;
        const isHex = shape === 'hexagon';
        const isTri = shape === 'triangle';
        const hexHoriz = squareSize * 1.5;
        const hexVert = squareSize * Math.sqrt(3);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isHex) {
            const colShift = Math.floor(gridOffset.x / hexHoriz);
            const offsetX = ((gridOffset.x % hexHoriz) + hexHoriz) % hexHoriz;
            const offsetY = ((gridOffset.y % hexVert) + hexVert) % hexVert;
            const cols = Math.ceil(canvas.width / hexHoriz) + 3;
            const rows = Math.ceil(canvas.height / hexVert) + 3;

            for (let col = -2; col < cols; col++) {
                for (let row = -2; row < rows; row++) {
                    const cx = col * hexHoriz + offsetX;
                    const cy = row * hexVert + ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) + offsetY;
                    const cellKey = `${col},${row}`;
                    const alpha = cellOpacities.get(cellKey);
                    if (alpha) {
                        ctx.globalAlpha = alpha;
                        this.drawHex(cx, cy, squareSize);
                        ctx.fillStyle = hoverFillColor;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                    this.drawHex(cx, cy, squareSize);
                    ctx.strokeStyle = borderColor;
                    ctx.stroke();
                }
            }
        } else if (isTri) {
            const halfW = squareSize / 2;
            const colShift = Math.floor(gridOffset.x / halfW);
            const rowShift = Math.floor(gridOffset.y / squareSize);
            const offsetX = ((gridOffset.x % halfW) + halfW) % halfW;
            const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;
            const cols = Math.ceil(canvas.width / halfW) + 4;
            const rows = Math.ceil(canvas.height / squareSize) + 4;

            for (let col = -2; col < cols; col++) {
                for (let row = -2; row < rows; row++) {
                    const cx = col * halfW + offsetX;
                    const cy = row * squareSize + squareSize / 2 + offsetY;
                    const flip = ((col + colShift + row + rowShift) % 2 + 2) % 2 !== 0;
                    const cellKey = `${col},${row}`;
                    const alpha = cellOpacities.get(cellKey);
                    if (alpha) {
                        ctx.globalAlpha = alpha;
                        this.drawTriangle(cx, cy, squareSize, flip);
                        ctx.fillStyle = hoverFillColor;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                    this.drawTriangle(cx, cy, squareSize, flip);
                    ctx.strokeStyle = borderColor;
                    ctx.stroke();
                }
            }
        } else if (shape === 'circle') {
            const offsetX = ((gridOffset.x % squareSize) + squareSize) % squareSize;
            const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;
            const cols = Math.ceil(canvas.width / squareSize) + 3;
            const rows = Math.ceil(canvas.height / squareSize) + 3;

            for (let col = -2; col < cols; col++) {
                for (let row = -2; row < rows; row++) {
                    const cx = col * squareSize + squareSize / 2 + offsetX;
                    const cy = row * squareSize + squareSize / 2 + offsetY;
                    const cellKey = `${col},${row}`;
                    const alpha = cellOpacities.get(cellKey);
                    if (alpha) {
                        ctx.globalAlpha = alpha;
                        this.drawCircle(cx, cy, squareSize);
                        ctx.fillStyle = hoverFillColor;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                    this.drawCircle(cx, cy, squareSize);
                    ctx.strokeStyle = borderColor;
                    ctx.stroke();
                }
            }
        } else {
            const offsetX = ((gridOffset.x % squareSize) + squareSize) % squareSize;
            const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;
            const cols = Math.ceil(canvas.width / squareSize) + 3;
            const rows = Math.ceil(canvas.height / squareSize) + 3;

            for (let col = -2; col < cols; col++) {
                for (let row = -2; row < rows; row++) {
                    const sx = col * squareSize + offsetX;
                    const sy = row * squareSize + offsetY;
                    const cellKey = `${col},${row}`;
                    const alpha = cellOpacities.get(cellKey);
                    if (alpha) {
                        ctx.globalAlpha = alpha;
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(sx, sy, squareSize, squareSize);
                        ctx.globalAlpha = 1;
                    }
                    ctx.strokeStyle = borderColor;
                    ctx.strokeRect(sx, sy, squareSize, squareSize);
                }
            }
        }

        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2,
            Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, '#120F17');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
