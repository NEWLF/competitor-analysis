import Link from "next/link";
import { results } from "./constants/result";
import { Button } from "antd";

export default function ResultListPage() {
  return (
    <div style={{ padding: "24px" }}>
      {Object.keys(results).map((href) => (
        <Link href={`/result/${href}`}>
          <Button>{href}</Button>
        </Link>
      ))}
    </div>
  );
}
