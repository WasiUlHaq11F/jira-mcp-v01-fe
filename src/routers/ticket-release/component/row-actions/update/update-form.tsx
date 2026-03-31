import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { TicketReleaseUpdate } from '../../../interface';
import { useTicketOptions } from '../../../../ticket/hooks/useTicketOptions';
import { useReleaseOptions } from '../../../../release/hooks/useReleaseOptions';


const TicketReleaseForm = memo(() => {
	const form = useFormContext<TicketReleaseUpdate>();


	const { data : ticketIds, isLoading : isLoadingTicketIds } = useTicketOptions();
	const { data : releaseIds, isLoading : isLoadingReleaseIds } = useReleaseOptions();



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
                    name="releaseId"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Release <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`releaseId-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''} disabled={isLoadingReleaseIds}>
                                <SelectTrigger id={field.name} className="w-full" disabled={isLoadingReleaseIds}>
                                    <SelectValue placeholder="Select Release" />
                                </SelectTrigger>
                                <SelectContent>
                                    {releaseIds?.map((option) => (
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
TicketReleaseForm.displayName = 'TicketReleaseForm';

export default TicketReleaseForm;