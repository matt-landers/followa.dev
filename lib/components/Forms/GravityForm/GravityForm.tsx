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
  const [formData, setFormData] = useState<GravityFormData>({});

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        await onSubmit(id, formData);
        setSubmitting(false);
      }}>
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
  );
};

export default GravityForm;
