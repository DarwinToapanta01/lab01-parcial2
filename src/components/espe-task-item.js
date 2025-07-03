import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('espe-task-item')
export class EspeTaskItem extends LitElement {
  @property({ type: Object })
  task = {};

  static styles = css`
    /* Estilos migrados de styles.css para task-item */
    :host { display: block; }
    .task-item {
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .task-item:hover {
      background-color: var(--color-fondo-claro); /* Usando variable CSS */
    }
    .text-white { color: var(--color-texto-blanco); }
    .text-\\[\\#8ecdb7\\] { color: var(--color-texto-claro); }
    .bg-\\[\\#10231c\\] { background-color: var(--color-fondo-oscuro); }
    .bg-\\[\\#214a3c\\] { background-color: var(--color-fondo-claro); }
    .hover\\:text-white:hover { color: var(--color-texto-blanco); }
    .hover\\:text-red-500:hover { color: #ef4444; } /* Rojo para eliminar */
  `;

  render() {
    return html`
      <div class="flex items-center gap-4 bg-[var(--color-fondo-oscuro)] px-4 min-h-[72px] py-2 task-item" @click="${this._handleItemClick}">
        <div class="text-white flex items-center justify-center rounded-lg bg-[var(--color-fondo-claro)] shrink-0 size-12" data-icon="Circle" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
          </svg>
        </div>
        <div class="flex-1 flex flex-col justify-center">
          <p class="text-white text-base font-medium leading-normal line-clamp-1">${this.task.name}</p>
          <p class="text-[var(--color-texto-claro)] text-sm font-normal leading-normal line-clamp-2">${this._formatTime(this.task.time)}</p>
        </div>
        <div class="task-actions flex gap-2">
          <button class="edit-task-btn text-[var(--color-texto-claro)] hover:text-white p-2" @click="${this._handleEditClick}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
            </svg>
          </button>
          <button class="delete-task-btn text-[var(--color-texto-claro)] hover:text-red-500 p-2" @click="${this._handleDeleteClick}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  _handleItemClick(event) {
    if (event.target.closest('button')) {
      return;
    }
    this.dispatchEvent(new CustomEvent('task-clicked', {
      detail: this.task.id,
      bubbles: true,
      composed: true
    }));
  }

  _handleEditClick(event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('edit-task-btn-clicked', {
      detail: this.task.id,
      bubbles: true,
      composed: true
    }));
  }

  _handleDeleteClick(event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('delete-task-btn-clicked', {
      detail: this.task.id,
      bubbles: true,
      composed: true
    }));
  }

  _formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  }
}