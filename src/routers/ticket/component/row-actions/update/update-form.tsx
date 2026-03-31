import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Checkbox } from '@/components/ui';
import { Field, FieldError, FieldLabel, FieldContent } from '@/components/ui/field';
import DatePicker from '@/components/DatePicker';
import { TicketUpdate } from '../../../interface';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const TicketForm = memo(() => {
	const form = useFormContext<TicketUpdate>();


	const { data : assignedByIds, isLoading : isLoadingAssignedByIds } = useUserOptions();
	const { data : assignedToIds, isLoading : isLoadingAssignedToIds } = useUserOptions();



	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<Controller control={form.control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Title <span className="text-destructive">*</span></FieldLabel>
                                <Input
                                    id={field.name}
                                    type="text"
                                    placeholder="Enter Title"
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="description"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Description <span className="text-destructive">*</span></FieldLabel>
                                <Textarea
                                    id={field.name}
                                    placeholder="Enter Description"
                                    className="resize-none"
                                    rows={3}
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller
                    control={form.control}
                    name="assignedById"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Assigned By <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`assignedById-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''} disabled={isLoadingAssignedByIds}>
                                <SelectTrigger id={field.name} className="w-full" disabled={isLoadingAssignedByIds}>
                                    <SelectValue placeholder="Select Assigned By" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assignedByIds?.map((option) => (
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
                    name="assignedToId"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Assigned To <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`assignedToId-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''} disabled={isLoadingAssignedToIds}>
                                <SelectTrigger id={field.name} className="w-full" disabled={isLoadingAssignedToIds}>
                                    <SelectValue placeholder="Select Assigned To" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assignedToIds?.map((option) => (
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
                    name="issueType"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Issue Type <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`issueType-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''}>
                                <SelectTrigger id={field.name} className="w-full">
                                    <SelectValue placeholder="Select Issue Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{"value":"Epic","label":"Epic"},{"value":"Story","label":"Story"},{"value":"Bug","label":"Bug"},{"value":"Task","label":"Task"}].map((option) => (
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
                    name="status"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Status <span className="text-destructive">*</span></FieldLabel>
                                <Select  key={`status-${field.value}`} onValueChange={(value) => field.onChange(value)} value={field.value?.toString() || ''}>
                                <SelectTrigger id={field.name} className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{"value":"Open","label":"Open"},{"value":"In Progress","label":"In Progress"},{"value":"Resolved","label":"Resolved"},{"value":"Closed","label":"Closed"},{"value":"Blocked","label":"Blocked"}].map((option) => (
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
                    name="dueDate"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Due Date</FieldLabel>
                                <DatePicker value={field.value || undefined } onChange={field.onChange} placeholder="Select Due Date" />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="timeLogHour"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Time Log Hours</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter Time Log Hours"
                                    {...field}
                                    value={field.value?.toString() || ''}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control} name="isBlocked"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} orientation="horizontal">
                                <Checkbox
                                    id={field.name}
                                    checked={field.value ?? false}
                                    onCheckedChange={field.onChange}
                                />
                                <FieldLabel htmlFor="isBlocked">Is Blocked <span className="text-destructive">*</span></FieldLabel>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="blockerDescription"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Blocker Description</FieldLabel>
                                <Textarea
                                    id={field.name}
                                    placeholder="Enter Blocker Description"
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
                    name="jiraTicketId"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Jira Ticket Id</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="text"
                                    placeholder="Enter Jira Ticket Id"
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
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
TicketForm.displayName = 'TicketForm';

export default TicketForm;