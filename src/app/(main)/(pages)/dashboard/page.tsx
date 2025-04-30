"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Clock, CheckCircle, BarChart } from "lucide-react";

// Placeholder data - will be replaced with Supabase data
const metrics = {
  totalAgents: 5,
  activeAgents: 3,
  weeklyCalls: 156,
  avgDuration: "4m 32s",
  qualifiedLeads: 89,
  successRate: "92%",
};

const recentCalls = [
  {
    id: 1,
    date: "2024-03-23 14:30",
    callerId: "+1 (555) 123-4567",
    duration: "4m 15s",
    summary: "Client interested in 3-bedroom apartment",
    transcriptUrl: "#",
  },
  {
    id: 2,
    date: "2024-03-23 13:45",
    callerId: "+1 (555) 234-5678",
    duration: "5m 30s",
    summary: "Looking for commercial property",
    transcriptUrl: "#",
  },
  {
    id: 3,
    date: "2024-03-23 12:15",
    callerId: "+1 (555) 345-6789",
    duration: "3m 45s",
    summary: "Inquiry about rental properties",
    transcriptUrl: "#",
  },
  {
    id: 4,
    date: "2024-03-23 11:30",
    callerId: "+1 (555) 456-7890",
    duration: "6m 20s",
    summary: "Interested in luxury homes",
    transcriptUrl: "#",
  },
  {
    id: 5,
    date: "2024-03-23 10:45",
    callerId: "+1 (555) 567-8901",
    duration: "4m 55s",
    summary: "Looking for investment properties",
    transcriptUrl: "#",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Status Alert */}
      <Alert>
        <AlertDescription>
          System is operating normally. All agents are functioning as expected.
        </AlertDescription>
      </Alert>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voice Agents</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAgents}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeAgents} active agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Calls</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.weeklyCalls}</div>
            <p className="text-xs text-muted-foreground">
              Average duration: {metrics.avgDuration}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Qualified</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.qualifiedLeads}</div>
            <p className="text-xs text-muted-foreground">
              Success rate: {metrics.successRate}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Caller ID</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Transcript</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>{call.date}</TableCell>
                  <TableCell>{call.callerId}</TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>{call.summary}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={call.transcriptUrl}>View</a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}