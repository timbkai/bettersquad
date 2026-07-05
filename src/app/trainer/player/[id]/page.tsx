import { players } from "@/data/mockData";
import PlayerDetailClient from "./PlayerDetailClient";

export function generateStaticParams() {
  return players.map((p) => ({ id: p.id }));
}

export default function PlayerDetail({ params }: { params: { id: string } }) {
  return <PlayerDetailClient id={params.id} />;
}
