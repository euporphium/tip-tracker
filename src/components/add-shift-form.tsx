import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shift_Insert } from '@/db/schema';

const formSchema = z.object({
  date: z.date(),
  hours: z.number().min(0.5).max(24).default(0),
  tips: z.number().min(0).default(0),
});

type WageForm = z.infer<typeof formSchema>;

export const AddShiftForm = ({
  onAddShift,
}: {
  onAddShift: (shift: Shift_Insert) => void;
}) => {
  const form = useForm<WageForm>({
    defaultValues: {
      date: new Date(),
      hours: undefined,
      tips: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onAddShift)}
        className="grid gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker date={field.value} onDateChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours Worked</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.5"
                  min={0}
                  placeholder="Hours Worked"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tips"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tips Earned</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  min={0}
                  placeholder="Tips Earned"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Shift</Button>
      </form>
    </Form>
  );
};
