import { LitElement, html, css, unsafeCSS } from 'lit';
import tailwindStyles from '../tailwind.css?inline';

export class EspeTaskDetailModal extends LitElement {
  static properties = {
    show: { type: Boolean },
    task: { type: Object }
  };

  constructor() {
    super();
    this.show = false;
    this.task = null;
  }

  static styles = [
      unsafeCSS(tailwindStyles),
      css`
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(16, 35, 28, 0.9);
      animation: fadeIn 0.3s;
    }

    .modal.show {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      position: relative;
      background-color: var(--color-fondo-claro);
      margin: auto;
      border-radius: 8px;
      border: 1px solid var(--color-borde);
      width: 100%;
      max-width: 512px;
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
      animation: slideDown 0.3s;
    }

    .modal-header {
      position: relative;
      border-bottom: 1px solid var(--color-borde);
    }

    .close {
      position: absolute;
      color: var(--color-texto-claro);
      top: 15px;
      right: 15px;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }

    .close:hover {
      color: var(--color-terciario);
    }

    /* Animaciones */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideDown {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .text-white { color: var(--color-texto-blanco); }
    .text-\\[\\#8ecdb7\\] { color: var(--color-texto-claro); }
    .bg-\\[\\#10231c\\] { background-color: var(--color-fondo-oscuro); }
    .bg-\\[\\#214a3c\\] { background-color: var(--color-fondo-claro); }
    .border-\\[\\#2f6a55\\] { border-color: var(--color-borde); }
    .bg-\\[\\#019863\\] { background-color: var(--color-terciario); }
  `];

  render() {
    if (!this.task) {
      return html`
        <div id="task-detail-modal" class="modal ${this.show ? 'show' : 'hidden'}">
          <div class="modal-content">
            <div class="modal-header">
              <span class="close" @click="${this._closeModal}">×</span>
            </div>
            <div class="modal-body">
              <p class="text-white text-center">No hay tarea seleccionada.</p>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div id="task-detail-modal" class="modal ${this.show ? 'show' : 'hidden'}">
        <div class="modal-content">
          <div class="modal-header">
            <div class="flex flex-wrap gap-2 p-4">
              <a class="text-[var(--color-texto-claro)] text-base font-medium leading-normal" href="#">Tareas</a>
              <span class="text-[var(--color-texto-claro)] text-base font-medium leading-normal">/</span>
              <span class="text-[var(--color-texto-blanco)] text-base font-medium leading-normal">Tarea</span>
            </div>
            <span class="close" @click="${this._closeModal}">×</span>
          </div>
          <div class="modal-body">
            <h2 id="detail-task-title" class="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">${this.task.name}</h2>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">Notas</p>
                <textarea
                  id="detail-task-notes"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[var(--color-borde)] bg-[var(--color-fondo-claro)] focus:border-[var(--color-borde)] min-h-36 placeholder:text-[var(--color-texto-claro)] p-[15px] text-base font-normal leading-normal"
                  readonly
                >${this.task.notes}</textarea>
              </label>
            </div>
            <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Detalles</h3>
            <div class="flex items-center gap-4 bg-[var(--color-fondo-oscuro)] px-4 min-h-[72px] py-2">
              <div class="text-white flex items-center justify-center rounded-lg bg-[var(--color-fondo-claro)] shrink-0 size-12" data-icon="Clock" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
                  <path d="M128,72a8,8,0,0,0-8,8v48a8,8,0,0,0,3.88,6.86l40,24a8,8,0,1,0,8.24-13.72L136,123.15V80A8,8,0,0,0,128,72Z"></path>
                </svg>
              </div>
              <div class="flex flex-col justify-center">
                <p class="text-white text-base font-medium leading-normal line-clamp-1">Hora</p>
                <p id="detail-task-time" class="text-[var(--color-texto-claro)] text-sm font-normal leading-normal line-clamp-2">${this._formatTime(this.task.time)}</p>
              </div>
            </div>
            <div class="flex items-center gap-4 bg-[var(--color-fondo-oscuro)] px-4 min-h-[72px] py-2">
              <div class="text-white flex items-center justify-center rounded-lg bg-[var(--color-fondo-claro)] shrink-0 size-12" data-icon="Flag" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M42.35,93.25a8,8,0,0,1,3.4-9.79C56.57,77.8,73.92,72,96,72a134.23,134.23,0,0,1,53.8,11.46A8,8,0,0,0,160,80V32a8,8,0,0,1,4.6-7.25,83.28,83.28,0,0,1,41,0A8,8,0,0,1,208,32v96a8,8,0,0,1-3.4,6.54C194.57,138.87,177.49,144,156,144a137.06,137.06,0,0,1-53.8-11.46A8,8,0,0,0,96,136v88a8,8,0,0,1-16,0V136C80,112.44,74.54,99.19,42.35,93.25ZM192,39.82a68.5,68.5,0,0,0-16,0V121.7c14.94-2.41,25.56-7.07,32-11.88ZM112,120.18a119,119,0,0,0,28,3.82,119,119,0,0,0,28-3.37V48.3c-7.75,1.52-16.71,2.71-28,2.71A119,119,0,0,0,112,47.64Z"></path>
                </svg>
              </div>
              <div class="flex flex-col justify-center">
                <p class="text-white text-base font-medium leading-normal line-clamp-1">Prioridad</p>
                <p id="detail-task-priority" class="text-[var(--color-texto-claro)] text-sm font-normal leading-normal line-clamp-2">${this._capitalizeFirstLetter(this.task.priority)}</p>
              </div>
            </div>
            <div class="flex px-4 py-3 justify-end">
              <button
                id="complete-task-btn"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[var(--color-terciario)] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                @click="${this._completeTask}"
              >
                <span class="truncate">Completar tarea</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _closeModal() {
    this.dispatchEvent(new CustomEvent('close-modal', { bubbles: true, composed: true }));
  }

  _completeTask() {
    if (this.task) {
      this.dispatchEvent(new CustomEvent('complete-task', {
        detail: this.task.id,
        bubbles: true,
        composed: true
      }));
    }
  }

  _formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  }

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

customElements.define('espe-task-detail-modal', EspeTaskDetailModal);