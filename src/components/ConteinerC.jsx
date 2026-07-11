import "../styles/ConteinerC.css";
import DiritaC from "./direitaC";
import EsquerdaC from "./esquerdaC";

function ConteinerC() {
  return (
    <div className="ConteinerC">
      <EsquerdaC />
      <DiritaC />
    </div>
  );
}
export default ConteinerC;
