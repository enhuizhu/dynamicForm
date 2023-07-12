/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Radio, FormControlLabel, Stack } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { StyledTable } from "./TableRadios.styles";
import { StyledRequired } from "../../../../global.styles";

export interface TableRadiosProps {
  fields?: {
    id: string;
    label: string;
    required?: boolean;
    error?: boolean;
  }[];
  options?: {
    value: string;
    label: string;
  }[];
  startFrom?: number;
  formData: Record<string, any>;
  id: string;
  onChange(id: string, value: any): void;
}

export const TableRadios: FC<TableRadiosProps> = ({
  fields,
  options,
  formData,
  onChange,
  startFrom = 1,
  id: tableId,
}) => (
  <StyledTable key={tableId}>
    <thead>
      <tr style={{ position: "relative", zIndex: 2 }}>
        <th>&nbsp;</th>
        {options?.map(({ label }) => (
          <th key={label}>{label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {fields?.map(({ id, label, required, error }, index) => {
        const dataValue = formData?.[id];
        return (
          <tr key={id}>
            <td className={error ? "error" : ""}>
              <Stack direction="row">
                {required && <StyledRequired>*</StyledRequired>}
                <span>{startFrom + index}.</span>&nbsp;<span>{label}</span>
                {error && (
                  <div>
                    <ErrorOutline
                      color="error"
                      aria-label="Error alert icon"
                      fontSize="small"
                      role="img"
                      aria-live="polite"
                      sx={{
                        marginLeft: "0.5rem",
                      }}
                    />
                  </div>
                )}
              </Stack>
            </td>
            {options?.map(({ value }) => (
              <td key={value}>
                <FormControlLabel
                  id={value}
                  key={value}
                  label={value}
                  control={<Radio />}
                  checked={dataValue === value}
                  onChange={() => {
                    onChange(id, value);
                  }}
                />
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </StyledTable>
);
