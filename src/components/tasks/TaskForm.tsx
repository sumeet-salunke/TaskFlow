{/* 
  useForm()
  -> it has :
  const {register, handleSubmit,
  formState: {errors},} = useForm();
  
  --> register - connects an input field to React hook form
  handleSubmit - validates and processes the form submission
  formState.errors - stores the validation erros
  defaultValues - set the inital values of fields
  reset - resets or replaces the form values
  watch - observes the field values
  setValue - updates a field programatically.
  */}

  
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  taskSchema,
  type TaskFormValues,
} from '../../validations/taskSchema';
import type { Task } from '../../types/task';
import type { TaskStatus, TaskPriority } from '../../types/task';

import './Form.css';

interface TaskFormProps {
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  submitLabel: string;
  initialValues?: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
  };
}

function TaskForm({
  onSubmit,
  submitLabel,
  initialValues,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof taskSchema>, unknown, TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
      status: initialValues?.status ?? 'pending',
      priority: initialValues?.priority ?? 'medium',
    },
  });

  const handleFormSubmit = (data: TaskFormValues) => {
    onSubmit(data);
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <div className="form-field">
        <label htmlFor="title">Task title</label>
        <input
          id="title"
          type="text"
          {...register('title')}
          placeholder="e.g. Complete project documentation"
          maxLength={120}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p className="form-error" id="title-error">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description')}
          placeholder="Add details about this task..."
          rows={4}
          maxLength={200}
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? 'description-error' : undefined
          }
        />
        {errors.description && (
          <p className="form-error" id="description-error">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" {...register('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="form-error">{errors.priority.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" {...register('status')}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="form-error">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
