import "./ShimmerLine.css";

export default function ShimmerLine({ loading }) {
  return (
    <div className={`top-loader ${loading ? "active" : ""}`}>
      <div className="shine"></div>
    </div>
  );
}
