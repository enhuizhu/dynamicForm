/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, useMemo } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Input, Box } from "@mui/material";
import { combineTextParts, getSynopsisText, noop } from "../../../../utils/appHelper";
import { useTitleMetadata, useTitles } from "../../../../hooks";

export interface DeliveryDateItem {
  episode: string;
  date: string;
  ccid: string;
  id: string;
}

export interface DeliveryDateProps {
  value: Record<string, string>;
  onChange(newValue: Record<string, string>): void;
}

const PAGE_SIZE = 15;

export const DeliveryDate: FC<DeliveryDateProps> = ({
  value = {},
  onChange = noop,
}) => {
  const { programmeCcid, serieCcid, titleCcid } = useParams<string>();
  const [rows, setRows] = useState<DeliveryDateItem[]>([]);
  const { data } = useTitles(
    serieCcid === "0" ? programmeCcid : serieCcid,
    serieCcid === "0" ? "brands" : "series"
  );

  const { data: titleData } = useTitleMetadata(titleCcid);

  useEffect(() => {
    if (data?.titleDetails && data?.titleDetails.length > 0) {
      const newRows =
        data?.titleDetails?.map(({ ccid, name, episodeNumber }) => ({
          episode: `${combineTextParts(getSynopsisText(episodeNumber, "Episode"), name)}`,
          ccid,
          date: value[ccid],
          id: ccid,
        })) || [];

      if (JSON.stringify(newRows) !== JSON.stringify(rows)) {
        setRows(newRows);
      }
    }
  }, [data, value]);

  useEffect(() => {
    if (titleData && titleCcid) {
      const newRows = [
        {
          episode: `${titleData.titleName}`,
          ccid: titleCcid,
          date: value[titleCcid],
          id: titleCcid,
        },
      ];

      if (JSON.stringify(newRows) !== JSON.stringify(rows)) {
        setRows(newRows);
      }
    }
  }, [titleData, value, titleCcid]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "episode",
        headerName: "Episode",
        resizable: true,
        width: 400,
      },
      {
        field: "date",
        headerName: "Contracted delivery date",
        resizable: true,
        width: 200,
        renderCell: (params: GridRenderCellParams) => (
          <Input
            type="date"
            value={params.value}
            onChange={(event) => {
              const matchedItem = rows.find((row) => row === params.row);

              if (matchedItem) {
                onChange({
                  ...value,
                  [matchedItem.ccid]: event.target.value,
                });
              }
            }}
          />
        ),
      },
    ],
    [onChange, rows, value]
  );

  return (
    <Box sx={{ height: "850px" }}>
      <DataGrid rows={rows} columns={columns} pageSize={PAGE_SIZE} />
    </Box>
  );
};
