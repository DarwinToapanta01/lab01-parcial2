import { LitElement, html, css, unsafeCSS } from 'lit';
import tailwindStyles from './tailwind.css?inline';

import './components/espe-header.js';
import './components/espe-task-list.js';
import './components/espe-add-task-modal.js';
import './components/espe-task-detail-modal.js';

export class EspeApp extends LitElement {
  static properties = {
    tasks: { type: Array },
    showAddTaskModal: { type: Boolean },
    showTaskDetailModal: { type: Boolean },
    selectedTask: { type: Object },
    isEditing: { type: Boolean },
    editingTaskId: { type: Number }
  };

  constructor() {
    super();
    this.tasks = [
      { id: 1, name: 'Reunión de Proyecto', notes: 'Preparar presentación para la reunión con el equipo.', time: '10:00', priority: 'alta', date: 'hoy' },
      { id: 2, name: 'Almuerzo con el equipo', notes: 'Discutir avances del proyecto durante el almuerzo.', time: '13:00', priority: 'media', date: 'hoy' },
      { id: 3, name: 'Presentación de la propuesta', notes: 'Presentar la propuesta final al cliente.', time: '09:00', priority: 'alta', date: 'mañana' },
      { id: 4, name: 'Revisión de código', notes: 'Revisar el código de la implementación actual.', time: '14:00', priority: 'media', date: 'mañana' }
    ];
    this.showAddTaskModal = false;
    this.showTaskDetailModal = false;
    this.selectedTask = null;
    this.isEditing = false;
    this.editingTaskId = null;
  }

  static styles = [
    unsafeCSS(tailwindStyles),
    css`
      :host {
        --color-primario: #003C71;
        --color-secundario: #FFD700;
        --color-terciario: #019863;
        --color-fondo-oscuro: #10231c;
        --color-fondo-claro: #17352b;
        --color-borde: #2f6a55;
        --color-texto-claro: #8ecdb7;
        --color-texto-blanco: #ffffff;
      }`
  ];

  render() {
    return html`
      <div class="relative flex size-full min-h-screen flex-col bg-[var(--color-fondo-oscuro)] dark group/design-root overflow-x-hidden" style='font-family: Manrope, "Noto Sans", sans-serif;'>
        <div class="layout-container flex h-full grow flex-col">
          <espe-header @open-add-task-modal="${this._openAddTaskModal}"></espe-header>
          <div class="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
            <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div class="flex flex-wrap justify-between gap-3 p-4">
                <p class="text-[var(--color-texto-blanco)] tracking-light text-[32px] font-bold leading-tight min-w-72">Mis Tareas</p>
              </div>
              <div class="pb-3">
                <div class="flex border-b border-[var(--color-borde)] px-4 gap-8">
                  <a class="flex flex-col items-center justify-center border-b-[3px] border-b-[var(--color-terciario)] text-[var(--color-texto-blanco)] pb-[13px] pt-4" href="#">
                    <p class="text-[var(--color-texto-blanco)] text-sm font-bold leading-normal tracking-[0.015em]">Por Fecha</p>
                  </a>
                  <a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[var(--color-texto-claro)] pb-[13px] pt-4" href="#">
                    <p class="text-[var(--color-texto-claro)] text-sm font-bold leading-normal tracking-[0.015em]">Por Prioridad</p>
                  </a>
                </div>
              </div>

              <espe-task-list
                .tasks="${this.tasks}"
                @task-selected="${this._handleTaskSelected}"
                @edit-task="${this._editTask}"
                @delete-task="${this._deleteTask}"
              ></espe-task-list>

              <div class="flex justify-end overflow-hidden px-5 pb-5">
                <button
                  id="add-task-btn"
                  class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-[var(--color-terciario)] text-[var(--color-texto-blanco)] text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-2 gap-4 pl-4 pr-6"
                  @click="${this._openAddTaskModal}"
                >
                  <div class="text-[var(--color-texto-blanco)]" data-icon="Plus" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                    </svg>
                  </div>
                  Agregar Tarea
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <espe-add-task-modal
        ?show="${this.showAddTaskModal}"
        .isEditing="${this.isEditing}"
        .editingTask="${this.editingTaskId ? this.tasks.find(t => t.id === this.editingTaskId) : null}"
        @close-modal="${this._closeAddTaskModal}"
        @save-task="${this._saveTask}"
      ></espe-add-task-modal>

      <espe-task-detail-modal
        ?show="${this.showTaskDetailModal}"
        .task="${this.selectedTask}"
        @close-modal="${this._closeTaskDetailModal}"
        @complete-task="${this._completeTask}"
      ></espe-task-detail-modal>
    `;
  }

  _openAddTaskModal(event) {
    this.showAddTaskModal = true;
    this.isEditing = false;
    this.editingTaskId = null;
  }

  _closeAddTaskModal(event) {
    this.showAddTaskModal = false;
    this.isEditing = false;
    this.editingTaskId = null;
  }

  _saveTask(event) {
    const { taskName, taskNotes, taskTime, taskPriority, isEditing, taskId } = event.detail;
    let newTasks = [...this.tasks];

    if (isEditing && taskId !== null) {
      const taskIndex = newTasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        newTasks[taskIndex] = {
          ...newTasks[taskIndex],
          name: taskName,
          notes: taskNotes,
          time: taskTime,
          priority: taskPriority
        };
      }
    } else {
      const newId = Math.max(...this.tasks.map(t => t.id), 0) + 1;
      const newTask = {
        id: newId,
        name: taskName,
        notes: taskNotes,
        time: taskTime,
        priority: taskPriority,
        date: 'hoy'
      };
      newTasks.push(newTask);
    }
    this.tasks = newTasks;
    this._closeAddTaskModal();
  }

  _handleTaskSelected(event) {
    const taskId = event.detail;
    this.selectedTask = this.tasks.find(t => t.id === taskId) || null; // Usar || null en JS puro
    this.showTaskDetailModal = true;
  }

  _closeTaskDetailModal() {
    this.showTaskDetailModal = false;
    this.selectedTask = null;
  }

  _editTask(event) {
    const taskId = event.detail;
    this.editingTaskId = taskId;
    this.isEditing = true;
    this.showAddTaskModal = true;
  }

  _deleteTask(event) {
    const taskId = event.detail;
    this.dispatchEvent(new CustomEvent('show-custom-confirm', {
      detail: {
        message: `¿Estás seguro de que deseas eliminar la tarea?`,
        onConfirm: () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          this._closeTaskDetailModal();
        }
      },
      bubbles: true,
      composed: true
    }));
  }

  _completeTask(event) {
    const taskId = event.detail;
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this._closeTaskDetailModal();
  }
}

customElements.define('espe-app', EspeApp);