import NewGame from "../new-game/NewGame";
import "./Winner.css";
const Winner = ({ numbers, reset }) => {
  if (!numbers.every((n) => n.value === n.index + 1)) return null;

  return (
    <div className="winner">
      <p>HURRAY!! </p>
      <p>You have won the game 🙂</p>
      <NewGame reset={reset} />
    </div>
  );
};
export default Winner;
