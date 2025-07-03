import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('espe-add-task-modal')
export class EspeAddTaskModal extends LitElement {
  @property({ type: Boolean })
  show = false;

  @property({ type: Boolean })
  isEditing = false;

  @property({ type: Object })
  editingTask = null;

  @query('#task-name')
  _taskNameInput;

  @query('#task-notes')
  _taskNotesInput;

  @query('#task-time')
  _taskTimeInput;

  @query('#task-priority')
  _taskPrioritySelect;

  static styles = css`
    /* Estilos del modal migrados de styles.css */
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

    /* Estilos de inputs/textareas/selects */
    .form-input {
      color: var(--color-texto-blanco);
      background-color: var(--color-fondo-claro);
      border: none;
    }
    .form-input::placeholder {
      color: var(--color-texto-claro);
    }
    .focus\\:outline-0:focus { outline: 0; }
    .focus\\:ring-0:focus { ring: 0; }
    .focus\\:border-none:focus { border: none; }
    .bg-\\[\\#019863\\] { background-color: var(--color-terciario); }
    .text-white { color: var(--color-texto-blanco); }
  `;

  render() {
    return html`
      <div id="add-task-modal" class="modal ${this.show ? 'show' : 'hidden'}">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              ${this.isEditing ? 'Editar Tarea' : 'Nueva tarea'}
            </h2>
            <span class="close" @click="${this._closeModal}">×</span>
          </div>
          <div class="modal-body">
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <input
                  id="task-name"
                  placeholder="Nombre de la tarea"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal leading-normal"
                  .value="${this.editingTask ? this.editingTask.name : ''}"
                />
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <textarea
                  id="task-notes"
                  placeholder="Notas"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg min-h-36 p-4 text-base font-normal leading-normal"
                  .value="${this.editingTask ? this.editingTask.notes : ''}"
                ></textarea>
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <input
                  id="task-time"
                  type="time"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal leading-normal"
                  .value="${this.editingTask ? this.editingTask.time : '10:00'}"
                />
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <select
                  id="task-priority"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal leading-normal"
                >
                  <option value="alta" ?selected="${this.editingTask && this.editingTask.priority === 'alta'}">Alta</option>
                  <option value="media" ?selected="${this.editingTask && this.editingTask.priority === 'media'}">Media</option>
                  <option value="baja" ?selected="${this.editingTask && this.editingTask.priority === 'baja'}">Baja</option>
                </select>
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <button
                id="save-task-btn"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[var(--color-terciario)] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                @click="${this._saveTask}"
              >
                <span class="truncate">${this.isEditing ? 'Guardar' : 'Agregar'}</span>
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

  _saveTask() {
    const taskName = this._taskNameInput.value.trim();
    const taskNotes = this._taskNotesInput.value.trim();
    const taskTime = this._taskTimeInput.value;
    const taskPriority = this._taskPrioritySelect.value;

    if (!taskName) {
      console.error('El nombre de la tarea no puede estar vacío.');
      return;
    }

    this.dispatchEvent(new CustomEvent('save-task', {
      detail: {
        taskName,
        taskNotes,
        taskTime,
        taskPriority,
        isEditing: this.isEditing,
        taskId: this.editingTask ? this.editingTask.id : null
      },
      bubbles: true,
      composed: true
    }));

    this._taskNameInput.value = '';
    this._taskNotesInput.value = '';
    this._taskTimeInput.value = '10:00';
    this._taskPrioritySelect.value = 'media';
  }
}