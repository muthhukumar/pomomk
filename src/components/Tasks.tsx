import * as React from "react";

import { FiPlus } from "react-icons/fi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";

import { TaskType, useTasks } from "../utils/hooks/tasks";

export default function AllTasks() {
  return (
    <div className="hidden md:block bg-black md:w-4/5 lg:w-1/2 h-screen p-3">
      <Tasks title="Next Session" isActiveSession />
      <Tasks title="Tasks" />
    </div>
  );
}

export function Tasks({
  isActiveSession = false,
  title,
}: {
  title: string;
  isActiveSession?: boolean;
}) {
  const { tasks } = useTasks();

  return (
    <>
      <div className="bg--black rounded-md border-smoke border m-3 p-3">
        <h3 className="font-bold mb-3">{title}</h3>
        <TaskInput isActiveSession={isActiveSession} />
        <div className="mt-3">
          <TaskList tasks={tasks} isActiveSession={isActiveSession} />
        </div>
      </div>
    </>
  );
}

function TaskList({
  isActiveSession,
  tasks,
}: {
  tasks: Array<TaskType>;
  isActiveSession: boolean;
}) {
  return (
    <div>
      <div className="flex flex-col gap-3">
        {tasks.map((t) => {
          return isActiveSession === t.active ? (
            <Task key={t.id} {...t} />
          ) : null;
        })}
      </div>
    </div>
  );
}

function TaskInput({ isActiveSession = false }: { isActiveSession?: boolean }) {
  const [task, setTask] = React.useState("");
  const [duration, setDuration] = React.useState("25m");

  const { addTask } = useTasks();

  return (
    <form
      className="group rounded-md p-3 w-full bg-matt-black border border-smoke flex items-center"
      onSubmit={(e) => {
        console.log("it is not ocming here");

        e.preventDefault();

        console.log("it is not ocming here");

        if (!task) {
          return;
        }

        addTask({
          duration: duration ? duration : "25m",
          title: task,
          active: isActiveSession,
        });

        setTask("");
        setDuration("");
      }}
    >
      <FiPlus />
      <input
        value={task}
        className="outline-none w-full mx-2 text-white bg-matt-black focus:outline-none"
        placeholder="What do you want to do next?"
        type="text"
        onChange={(e) => setTask(e.target.value)}
      />
      {Boolean(task) && (
        <input
          type="text"
          value={duration}
          className="w-10 outline-none text-white bg-matt-black focus:outline-none"
          placeholder="25m"
          onChange={(e) => setDuration(e.target.value)}
        />
      )}
      <input type="submit" hidden={true} />
    </form>
  );
}

function Task({ completed, duration, title, id }: TaskType) {
  const { setDuration, setTitle, toggleTask } = useTasks();

  return (
    <div className="rounded-md border-smoke p-3 w-full bg-matt-black text-white border flex items-center">
      <button onClick={() => toggleTask({ taskId: id, completed: !completed })}>
        {completed ? (
          <RiCheckboxCircleFill size={20} className="text-smoke" />
        ) : (
          <RiCheckboxBlankCircleLine size={20} className="text-smoke" />
        )}
      </button>

      <input
        value={title}
        className="outline-none w-full mx-2 text-white bg-matt-black focus:outline-none"
        placeholder="What do you want to do next?"
        onChange={(e) => setTitle({ taskId: id, title: e.target.value })}
      />

      {Boolean(duration) && (
        <input
          type="text"
          value={duration}
          className="w-10 outline-none text-white bg-matt-black focus:outline-none"
          onChange={(e) =>
            setDuration({ taskId: id, duration: e.target.value })
          }
        />
      )}
    </div>
  );
}
