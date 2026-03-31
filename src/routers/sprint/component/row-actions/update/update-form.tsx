import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import DatePicker from '@/components/DatePicker';
import { SprintUpdate } from '../../../interface';


const SprintForm = memo(() => {
	const form = useFormContext<SprintUpdate>();





	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<Controller control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Name <span className="text-destructive">*</span></FieldLabel>
                                <Input
                                    id={field.name}
                                    type="text"
                                    placeholder="Enter Name"
                                    {...field}
                                    value={field.value?.toString() || ''}
                                />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="startDate"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Start Date <span className="text-destructive">*</span></FieldLabel>
                                <DatePicker value={field.value || undefined } onChange={field.onChange} placeholder="Select Start Date" />
                            
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
<Controller control={form.control}
                    name="endDate"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>End Date <span className="text-destructive">*</span></FieldLabel>
                                <DatePicker value={field.value || undefined } onChange={field.onChange} placeholder="Select End Date" />
                            
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
                                    {[{"value":"Planned","label":"Planned"},{"value":"Active","label":"Active"},{"value":"Completed","label":"Completed"},{"value":"Archived","label":"Archived"}].map((option) => (
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
                    name="jiraSprintId"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Jira Sprint Id</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="text"
                                    placeholder="Enter Jira Sprint Id"
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
SprintForm.displayName = 'SprintForm';

export default SprintForm;