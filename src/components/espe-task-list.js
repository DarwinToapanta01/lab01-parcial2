import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './espe-task-item.js'; // Importa .js

@customElement('espe-task-list')
export class EspeTaskList extends LitElement {
  @property({ type: Array })
  tasks = [];

  static styles = css`
    /* Estilos específicos para la lista de tareas */
    :host { display: block; }
  `;

  render() {
    const groupedTasks = this.tasks.reduce((acc, task) => {
      acc[task.date] = acc[task.date] || [];
      acc[task.date].push(task);
      return acc;
    }, {});

    return html`
      <div id="tasks-container">
        ${Object.keys(groupedTasks).map(date => html`
          <h3 class="text-[var(--color-texto-blanco)] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            ${this._capitalizeFirstLetter(date)}
          </h3>
          ${groupedTasks[date].map(task => html`
            <espe-task-item
              .task="${task}"
              @task-clicked="${this._handleTaskClicked}"
              @edit-task-btn-clicked="${this._handleEditTask}"
              @delete-task-btn-clicked="${this._handleDeleteTask}"
            ></espe-task-item>
          `)}
        `)}
      </div>
    `;
  }

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _handleTaskClicked(event) {
    if (event.target.closest('button')) {
      return;
    }
    this.dispatchEvent(new CustomEvent('task-selected', {
      detail: event.detail, // Asegúrate que el detail se propague correctamente
      bubbles: true,
      composed: true
    }));
  }

  _handleEditTask(event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: event.detail,
      bubbles: true,
      composed: true
    }));
  }

  _handleDeleteTask(event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('delete-task', {
      detail: event.detail,
      bubbles: true,
      composed: true
    }));
  }
}