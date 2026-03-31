import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { TicketSprintUpdate } from '../../../interface';
import { useTicketOptions } from '../../../../ticket/hooks/useTicketOptions';
import { useSprintOptions } from '../../../../sprint/hooks/useSprintOptions';


const TicketSprintForm = memo(() => {
	const form = useFormContext<TicketSprintUpdate>();


	const { data : ticketIds, isLoading : isLoadingTicketIds } = useTicketOptions();
	const { data : sprintIds, isLoading : isLoadingSprintIds } = useSprintOptions();



	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<Controller
                    control={form.control}
                    name="ticketId"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Ticket <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`ticketId-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''} disabled={isLoadingTicketIds}>
                                <SelectTrigger id={field.name} className="w-full" disabled={isLoadingTicketIds}>
                                    <SelectValue placeholder="Select Ticket" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ticketIds?.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller
                    control={form.control}
                    name="sprintId"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Sprint <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`sprintId-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''} disabled={isLoadingSprintIds}>
                                <SelectTrigger id={field.name} className="w-full" disabled={isLoadingSprintIds}>
                                    <SelectValue placeholder="Select Sprint" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sprintIds?.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
			</div>
		</Form>
	);
});
TicketSprintForm.displayName = 'TicketSprintForm';

export default TicketSprintForm;