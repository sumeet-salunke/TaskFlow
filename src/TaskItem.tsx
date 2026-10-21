
/*
type TaskItemProps = {
  title: string;
  completed: boolean;
  description?: string;
}*/

interface TaskItemProps{
  title: string;
  description?:string;
  completed: boolean;
}

{/* We're destructuring the props object and telling TypeScript that it must conform to TaskItemProps. */}
function TaskItem({title, completed, description="No description provided"}:TaskItemProps){
  return (
    <div>
      <h2>{title}</h2>
      {description && (<p>{description}</p>)}
      <p>{completed?'Completed':'Pending'}</p>
    </div>
  )
}

export default TaskItem;