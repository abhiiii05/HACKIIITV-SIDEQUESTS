"use client";

import { createTeams } from "@/actions/team";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Team {
  name: string;
  unstopId: number;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim());
    const headers = lines[0].split(",").map((h) => h.trim());

    const data = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      return Object.fromEntries(headers.map((h, i) => [h, values[i] || ""]));
    });

    const processedTeams: Team[] = data.map((row) => ({
      name: row["Team Name"],
      unstopId: parseInt(row["Unstop ID"]),
    }));

    setTeams(processedTeams);
  };

  return (
    <div className="min-h-screen h-screen w-screen overflow-auto bg-black rounded-md text-gray-200 p-8">
      <input 
        type="file" 
        accept=".csv"
        onChange={handleFileSelect}
        className="block w-full mb-4 text-sm text-gray-200
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-500 file:text-white
          hover:file:opacity-90"
      />
      <div className="w-full flex flex-row justify-center mb-8">
        <button
          className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
          onClick={async () => {
            const result = await createTeams(teams);
            console.log(result);
          }}
        >
          Create Teams
        </button>
      </div>
      
      {teams.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Name</TableHead>
              <TableHead>Unstop ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, idx) => (
              <TableRow key={idx}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.unstopId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}