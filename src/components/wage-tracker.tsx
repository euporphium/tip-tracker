'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import StatDisplay from '@/components/stat-display';
import { AddShiftForm } from '@/components/add-shift-form';
import { addShift } from '@/actions/shift';
import { Shift_Insert, Shift } from '@/db/schema';
import { ShiftsGrid } from '@/components/shifts-grid';
import { useToast } from '@/hooks/use-toast';

export const WageTracker = ({ initialShifts }: { initialShifts: Shift[] }) => {
  const [showForm, setShowForm] = useState(false);
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const { toast } = useToast();

  const handleAddShift = async (shift: Shift_Insert) => {
    setShowForm(false);
    const result = await addShift(shift);

    if (result.success) {
      setShifts([...shifts, result.data]);

      toast({
        title: 'Shift Added',
        description: format(shift.date, 'P'),
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error: Shift Not Added',
        description: result.error,
      });
    }
  };

  const calculateStats = () => {
    if (shifts.length === 0) {
      return { avgHourly: 0, totalHours: 0, totalTips: 0 };
    }

    const totalHours = shifts.reduce((sum, shift) => sum + shift.hours, 0);
    const totalTips = shifts.reduce((sum, shift) => sum + shift.tips, 0);
    const avgHourly = (totalTips / totalHours).toFixed(2);

    return { avgHourly, totalHours, totalTips };
  };

  const stats = calculateStats();

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Earnings Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-3 gap-4">
            <StatDisplay value={`$${stats.avgHourly}`} label="Avg. Hourly" />
            <StatDisplay value={`${stats.totalHours}h`} label="Total Hours" />
            <StatDisplay value={`$${stats.totalTips}`} label="Total Tips" />
          </div>
          <Dialog modal={false} open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button className="w-full">Add Shift</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Shift</DialogTitle>
                <DialogDescription>
                  Enter the details for your new work shift.
                </DialogDescription>
              </DialogHeader>
              <AddShiftForm onAddShift={handleAddShift} />
            </DialogContent>
          </Dialog>
          <ShiftsGrid shifts={shifts} />
        </CardContent>
      </Card>
    </div>
  );
};
