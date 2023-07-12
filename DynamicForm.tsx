/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import {
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Stack,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Select,
  Typography,
  Autocomplete as AutocompleteWithSingleSelection,
  Box
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Help, InfoOutlined } from "@mui/icons-material";
import { TableRadios } from "./components/TableRadios";
import { GroupCheckboxes, StyledCheckboxContainer } from "../GroupCheckboxes";
import {
  StyledSectionTitle,
  StyledSectionDescription,
  StyledFormFieldContainer,
  StyledFormFiledWrapper,
  StyledDropdownV2Wrapper,
} from "./DynamicForm.styles";
import {
  StyledRequired,
  StyledTextAreaContainer,
  StyledInputContainer,
} from "../../global.styles";

import { uuidv4 } from "../../utils/appHelper";
// to do need to move to dynamic form folder
import { shouldShowField } from "./DynamicForm.helper";
import { Contributors } from "./components/Contributors";
import { DeliveryDate } from "./components/DiliveryDate/DeliveryDate";

export const TEXT = "TEXT";
export const DATE = "DATE";
export const RADIO = "RADIO";
export const SELECT = "SELECT";
export const TEXTAREA = "TEXTAREA";
export const EMPTY = "EMPTY";
export const TABLE_RADIO = "TABLE_RADIO";
export const GROUP_CHECKBOXES = "GROUP_CHECKBOXES";
export const CHECKBOX = "CHECKBOX";
export const AUTOCOMPLETE = "AUTOCOMPLETE";
export const CONTRIBUTORS = "CONTRIBUTORS";
export const DELIVERY_DATE = "DELIVERY_DATE";
export const AUTOCOMPLETE_WITH_SINGLE_SELECTION = "AUTOCOMPLETE_WITH_SINGLE_SELECTION";

export const EMPTY_FORM_FIELD = {
  type: EMPTY,
  label: "",
  id: "",
  value: "",
  columnCount: 6,
};

export const getEmptyField = (columnCount = 6) => ({
  ...EMPTY_FORM_FIELD,
  id: uuidv4(),
  columnCount,
});

export interface FormConfig {
  sectionTitle: any;
  key: string;
  description: string;
  visibleDependencies?: Record<string, any>;
  formFields: FormField[];
}

export interface Option {
  label: string;
  value: any;
}

export interface FormField {
  type: string;
  label?: string;
  groupBy?: string;
  fields?: {
    id: string;
    label: string;
    required: boolean;
  }[];
  id: string;
  options?: Option[];
  value?: any;
  columnCount: number;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputType?: string;
  error?: boolean;
  icon?: React.ReactNode;
  visibleDependencies?: Record<string, any>;
  startFrom?: number;
  vertical?: boolean;
  questionBubble?: string;
  subTitle?: React.ReactNode;
  endAdornment?: string;
  isRow?: boolean;
}

export interface DynamicFromProps {
  config: FormConfig[];
  onValueChange(id: string, newValue: any): void;
  formData: Record<string, any>;
  onBlur?(id: string, newValue: any): void;
  parent?: string;
  inModal?: boolean;
}

const QuestionBubbleTooltip: FC<{questionBubble?: string}> = ({questionBubble}) => {
  if (!questionBubble) {
    return <></>
  }

  return (
    <Tooltip
      title={
        <span style={{ fontSize: "1rem", lineHeight: "1.5rem" }}>
          {questionBubble}
        </span>
      }
      placement="top"
    >
      <IconButton>
        <Help color="primary" />
      </IconButton>
    </Tooltip>
  );
}

export const FormFiledWrapper: FC<{
  formField: FormField;
  onChange(id: string, value: any): void;
  value: any;
  formData: Record<string, any>;
  onBlur?(id: string, value: any): void;
}> = ({
  formField: {
    type,
    label = "",
    id = "",
    options,
    columnCount,
    required,
    disabled,
    placeholder,
    inputType = "text",
    error,
    icon,
    fields,
    visibleDependencies,
    startFrom = 1,
    vertical = false,
    questionBubble,
    subTitle,
    endAdornment,
    isRow=false
  },
  onChange,
  onBlur,
  value,
  formData,
}) => {
  let content;
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const internalValueChanged = useRef<boolean>(false);
  const [internalValue, setInternalValue] = useState<any>();

  useEffect(() => {
    if (!internalValueChanged.current) {
      setInternalValue(value);
    }
  }, [id, value]);

  const handleChange = useCallback(
    (newValue) => {
      internalValueChanged.current = true;

      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        onChange(id, newValue);
      }, 300);
    },
    [id, onChange]
  );

  const handleBlur = useCallback(
    (newValue) => {
      if (onBlur) {
        onBlur(id, newValue);
      }
    },
    [id, onBlur]
  );

  if (visibleDependencies && !shouldShowField(formData, visibleDependencies)) {
    return <></>;
  }

  if (type === TEXT) {
    content = (
      <StyledInputContainer hasError={error}>
        <FormLabel
          error={error}
          required={required}
          sx={{ display: "block", marginBottom: "0.5rem" }}
        >
          {label}
        </FormLabel>
        <TextField
          value={internalValue}
          fullWidth
          size="small"
          label=""
          id={id}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          type={inputType}
          onBlur={(event) => {
            handleBlur(event.target.value);
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
            endAdornment: <InputAdornment position="end"><Typography color='disabled'>{endAdornment}</Typography></InputAdornment>
          }}
          error={error}
          onChange={(event) => {
            setInternalValue(event.target.value);
            handleChange(event.target.value);
          }}
        />
      </StyledInputContainer>
    );
  } else if (type === CONTRIBUTORS) {
    const contributors = internalValue || [];

    content = (
      <Contributors
        contributors={contributors}
        disabled={Boolean(disabled)}
        onChange={(newContributors) => {
          setInternalValue(newContributors);
          handleChange(newContributors);
          handleBlur(newContributors);
        }}
      />
    );
  } else if (type === DELIVERY_DATE) {
    content = (
      <DeliveryDate
        value={internalValue}
        onChange={(newValue) => {
          setInternalValue(newValue);
          handleChange(newValue);
          handleBlur(newValue);
        }}
      />
    );
  } else if (type === AUTOCOMPLETE) {
    content = (
      <StyledDropdownV2Wrapper>
        <Autocomplete
          id={id}
          label={label}
          options={options as Option[] || []}
          selectedValues={internalValue || []}
          questionBubble={questionBubble}
          onRemove={(removedValue) => {
            const newValue = (value || []).filter(
              ({ id: optionId }: any) => optionId !== removedValue.id
            );

            setInternalValue(newValue);
            handleChange(newValue);
            handleBlur(newValue);
          }}
          onChange={(selectedValue) => {
            const newValue = value || [];
            newValue.push(selectedValue);
            setInternalValue(newValue);
            handleChange(newValue);
            handleBlur(newValue);
          }}
          width="100%"
          placeholder={placeholder}
          error={error}
        />
      </StyledDropdownV2Wrapper>
    );
  } else if (type === TEXTAREA) {
    content = (
      <StyledTextAreaContainer hasError={error}>
        <FormLabel
          error={error}
          required={required}
          sx={{ display: "block", marginBottom: "0.5rem" }}
        >
          {label}
          {subTitle && <Typography variant="body2">{subTitle}</Typography>}
          {/* <QuestionBubbleTooltip questionBubble={questionBubble} /> */}
        </FormLabel>
        <TextField
          value={internalValue || ""}
          id={id}
          multiline
          fullWidth
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          error={error}
          maxRows={8}
          minRows={8}
          data-testid={id}
          onChange={(event) => {
            setInternalValue(event.target.value);
            handleChange(event.target.value);
          }}
          onBlur={(event) => {
            handleBlur(event.target.value);
          }}
        />
      </StyledTextAreaContainer>
    );
  } else if (type === RADIO) {
    content = (
      <FormControl>
        <div>
          <FormLabel id={`dynamic-form-${label}`}><>
              {label}{" "}
              <QuestionBubbleTooltip questionBubble={questionBubble} />
            </></FormLabel>
          {required && (
            <StyledRequired style={{ marginLeft: "10px" }}>*</StyledRequired>
          )}
          {error && (
            <InfoOutlined color="error" fontSize="small" sx={{marginLeft: '0.5rem', top: '0.25rem', position: 'relative'}}/>
          )}
        </div>
        <RadioGroup aria-labelledby={`dynamic-form-${label}`} name={label} row={isRow}>
          {options?.map(({ label: labelText, value: dataValue }) => (
            <FormControlLabel
              id={dataValue}
              key={dataValue}
              control={<Radio />}
              label={labelText}
              checked={internalValue === dataValue}
              disabled={disabled}
              onChange={() => {
                setInternalValue(dataValue);
                handleChange(dataValue);
                handleBlur(dataValue);
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  } else if (type === CHECKBOX) {
    content = (
      <StyledCheckboxContainer>
        <FormControlLabel
          control={
            <Checkbox
              id={id}
              checked={internalValue === true}
              name={id}
              value={internalValue}
              onChange={(event: any) => {
                setInternalValue(event.target.checked);
                handleChange(event.target.checked);
                handleBlur(event.target.checked);
              }}
            />
          }
          label={
            <>
              {label}{" "}
              <QuestionBubbleTooltip questionBubble={questionBubble} />
            </>
          }
        />
      </StyledCheckboxContainer>
    );
  } else if (type === TABLE_RADIO) {
    content = (
      <TableRadios
        fields={fields}
        formData={formData}
        options={options}
        onChange={(fieldId, newValue) => {
          if (onChange) {
            onChange(fieldId, newValue);
          }

          if (onBlur) {
            onBlur(fieldId, newValue);
          }
        }}
        startFrom={startFrom}
        id={id}
      />
    );
  } else if (type === GROUP_CHECKBOXES) {
    content = (
      <GroupCheckboxes
        label={label}
        value={internalValue}
        error={error}
        options={options}
        required={required}
        vertical={vertical}
        onChange={(newValue) => {
          setInternalValue(newValue);
          handleChange(newValue);
          handleBlur(newValue);
        }}
      />
    );
  } else if (type === SELECT) { 
    const inputLabelStr = `dropdownLabel-${label}`;
    const selectValue = internalValue ?? '';
    
    content = (
      <StyledInputContainer hasError={error}>
        <FormLabel 
          error={error}
          required={required}
          sx={{ display: "block", marginBottom: "0.5rem" }}
        >
          {label}
        </FormLabel>
        <Select
          labelId={inputLabelStr}
          id={id}
          error={error}
          sx={{width: "100%"}}
          onChange={(event) => {
            setInternalValue(event.target.value);
            handleChange(event.target.value);
            handleBlur(event.target.value);
          }}
          size="small"
          disabled={disabled}
          required={required}
          value={selectValue}
        >
          {options?.map((optionValue) => (
            <MenuItem
              key={optionValue.label}
              value={optionValue.value}
            >
              {optionValue.label}
            </MenuItem>
          ))}
        </Select>
      </StyledInputContainer>
     );
  } else if (type === AUTOCOMPLETE_WITH_SINGLE_SELECTION) {
    content = (
      <StyledInputContainer hasError={error}>
        <FormLabel 
          error={error}
          required={required}
          sx={{ display: "block", marginBottom: "0.5rem" }}
        >
          {label}
        </FormLabel>
        <AutocompleteWithSingleSelection
          id={id}
          sx={{width: "100%"}}
          onChange={(_, option) => {
            if (option) {
              setInternalValue(option.value);
              handleChange(option.value);
              handleBlur(option.value);
            }
          }}
          size="small"
          disabled={disabled}
          options={options ?? []}
          value={internalValue}
          renderInput={(params) => (
            <TextField
              {...params}
            />
          )}
        />
      </StyledInputContainer>
     );
  } else if (type === DATE) {
    content = (
      <DesktopDatePicker 
        inputFormat="DD/MM/YYYY"
        value={internalValue || null}
        onChange={(newDate) => {
          if (dayjs(newDate).isValid() || newDate === null) {
            const newValue = newDate ?? ""
            
            setInternalValue(newValue);
            handleChange(newValue);
            handleBlur(newValue);
          }
        }}
        disabled={disabled}
        renderInput={(params) => <>
          <FormLabel
            error={error}
            required={required}
            sx={{ display: "block", marginBottom: "0.5rem" }}
          >
          {label}
          </FormLabel>
          <TextField 
            {...params} 
            placeholder={placeholder}
            required={required}
            error={error}
            size="small"
            fullWidth
          />
        </>}
      />
    );
  } else {
    content = <div />;
  }

  return (
    <StyledFormFiledWrapper columnCount={columnCount}>
      {error && <div className="error" />}
      {content}
    </StyledFormFiledWrapper>
  );
};

export const DynamicForm: FC<DynamicFromProps> = ({
  config,
  onValueChange,
  formData,
  onBlur,
  parent = "",
  inModal = false,
}) => {
  const SectionContainer: FC<any> = inModal ? Box : Card;
  const ContentHolder: FC<any> = inModal? Box: CardContent;

  return (<Stack spacing={ inModal ? 0 :  3}>
    {config.map(
      (
        { sectionTitle, description, formFields, key, visibleDependencies },
        index
      ) =>
        visibleDependencies &&
        !shouldShowField(formData, visibleDependencies) ? (
          <></>
        ) : (
          <SectionContainer
            key={`${sectionTitle}-${description}-${key}-${index}`}
            sx={{ overflow: "visible" }}
          >
            <ContentHolder sx={{ padding: inModal ? "0rem" : "1rem" }}>
              <StyledSectionTitle>{sectionTitle}</StyledSectionTitle>
              <StyledSectionDescription>{description}</StyledSectionDescription>
              <StyledFormFieldContainer>
                {formFields.map((formField) => {
                  const value = formField.groupBy
                    ? formData?.[formField.groupBy]?.[formField.id]
                    : formData?.[formField.id];

                  return (
                    <FormFiledWrapper
                      key={`${parent}${formField.id}`}
                      formField={formField}
                      onChange={onValueChange}
                      onBlur={onBlur}
                      value={value}
                      formData={formData}
                    />
                  );
                })}
              </StyledFormFieldContainer>
            </ContentHolder>
          </SectionContainer>
        )
    )}
  </Stack>)
} 
