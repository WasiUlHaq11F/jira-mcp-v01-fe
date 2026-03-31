import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { NotificationUpdate } from '../../../interface';
import { useTicketOptions } from '../../../../ticket/hooks/useTicketOptions';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const NotificationForm = memo(() => {
	const form = useFormContext<NotificationUpdate>();


	const { data : ticketIds, isLoading : isLoadingTicketIds } = useTicketOptions();
	const { data : recipientIds, isLoading : isLoadingRecipientIds } = useUserOptions();



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
                    name="recipientId"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Recipient <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`recipientId-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''} disabled={isLoadingRecipientIds}>
                                <SelectTrigger id={field.name} className="w-full" disabled={isLoadingRecipientIds}>
                                    <SelectValue placeholder="Select Recipient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {recipientIds?.map((option) => (
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
<Controller control={form.control}
                    name="typeName"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Type Name <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`typeName-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''}>
                                <SelectTrigger id={field.name} className="w-full">
                                    <SelectValue placeholder="Select Type Name" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{"value":"Ticket Created","label":"Ticket Created"},{"value":"Ticket Reassigned","label":"Ticket Reassigned"},{"value":"Ticket Updated","label":"Ticket Updated"},{"value":"Status Change","label":"Status Change"}].map((option) => (
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
<Controller control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Message <span className="text-destructive">*</span></FieldLabel>
                                <Textarea
                                    id={field.name}
                                    placeholder="Enter Message"
                                    className="resize-none"
                                    rows={3}
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="status"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Status <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`status-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''}>
                                <SelectTrigger id={field.name} className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{"value":"Unread","label":"Unread"},{"value":"Read","label":"Read"}].map((option) => (
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
<Controller control={form.control}
                    name="notificationChannel"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Notification Channel</FieldLabel>
                                <Select  key={`notificationChannel-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''}>
                                <SelectTrigger id={field.name} className="w-full">
                                    <SelectValue placeholder="Select Notification Channel" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{"value":"Email","label":"Email"},{"value":"Slack","label":"Slack"},{"value":"In-App","label":"In-App"}].map((option) => (
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
<Controller control={form.control}
                    name="jiraLink"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Jira Link</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="url"
                                    placeholder="Enter Jira Link"
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
			</div>
		</Form>
	);
});
NotificationForm.displayName = 'NotificationForm';

export default NotificationForm;