import React, { useState } from 'react';

import styles from './GravityForm.module.scss';

export interface GravityFormField {
  id: number;
  type: string;
  label: string;
  description?: string;
  placeholder?: string;
  isRequired?: boolean;
}

export interface GravityFormProps {
  id: number;
  fields: Array<GravityFormField>;
  onSubmit: (id: number, data: GravityFormData) => Promise<void>;
}

export type GravityFormData = Record<
  string,
  { field: GravityFormField; value: string }
>;

const GravityForm: React.FC<GravityFormProps> = ({ id, fields, onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<GravityFormData>({});

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      await onSubmit(id, formData);
      showSuccess();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  function showSuccess() {
    setSuccess(true);
    setFormData({});
    setTimeout(() => setSuccess(false), 5000);
  }

  console.log(formData);

  return (
    <>
      {error && <p className={styles.error}>Error: {error}</p>}
      {success && (
        <p className={styles.success}>Thank you for your submission!</p>
      )}
      <form className={styles.form} onSubmit={submitForm}>
        {fields.map((field) => {
          switch (field.type) {
            case 'text':
              return (
                <React.Fragment key={field.id}>
                  <label htmlFor={field.label}>
                    {field.label}
                    {field.isRequired && '*'}
                  </label>
                  {field.description && <p>{field.description}</p>}
                  <input
                    value={formData[field.id]?.value ?? ''}
                    required={!!field.isRequired}
                    type="text"
                    name={field.label}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.id]: { field, value: e.target.value },
                      })
                    }
                  />
                </React.Fragment>
              );
          }
        })}
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
    </>
  );
};

export default GravityForm;
