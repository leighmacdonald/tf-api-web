import type { AnyFieldApi } from '@tanstack/react-form'

export const FieldInfo = ({ field }: { field: AnyFieldApi }) => (
    <>
        {field.state.meta.isTouched && field.state.meta.errors.length ? (
            <em>{field.state.meta.errors.join(',')}</em>
        ) : null}
        {field.state.meta.isValidating ? 'Validating...' : null}
    </>
);