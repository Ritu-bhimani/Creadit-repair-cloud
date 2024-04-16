import { Divider, List } from "@mui/material";
import moment from "moment";
import { FC, useState } from "react";
import { capitalizeFirstLetter } from "../../utils";
import { emailMenuStyles, ErrorHeader, NoDataMessage, viewALLStyle } from "./styles";
import { size } from 'lodash-es';

type PendingBatchPrintProps = {
    pendingLetters: any;
};
export const PendingBatchPrintTab: FC<PendingBatchPrintProps> = ({
    pendingLetters
}: PendingBatchPrintProps) => {

    const [viewAllListID, setViewAllListID] = useState<any>([]);
    const { list } = emailMenuStyles;
    const formatLettersData = (data: any) => {
        type DataArrays = {
            letterids: string[];
            lettertitles: string[];
            letterdates: string[];
        };

        // Convert comma-separated string values to arrays
        const dataArrays: DataArrays = Object.fromEntries(
            Object.entries(data).map(([key, value]) =>
                typeof value === 'string' ? [key, value.split(',')] : [key, value]
            )
        ) as any;

        // Combine arrays into an array of objects
        const result = Array.from(
            { length: dataArrays.letterids.length },
            (_, i) => ({
                letterid: dataArrays.letterids[i],
                lettertitles: dataArrays.lettertitles[i],
                letterdates: dataArrays.letterdates[i]
            })
        );

        return result;
    };
    const handleViewLess = (item: any) => {
        setViewAllListID((prevState: any) =>
            prevState.filter((prevItem: any) => prevItem !== item)
        );
    };
    const handleViewAll = (id: any) => {
        setViewAllListID([...viewAllListID, id]);
    };
    return (
        <List sx={{ maxHeight: '40vh', overflow: 'auto', paddingTop:'0' }}>
            {pendingLetters &&
                pendingLetters.map((batchPrint: any, idx: number) => {
                    const lettersData = formatLettersData(batchPrint);
                    return (
                        <>
                            <List
                                key={idx}
                                subheader={
                                    <ErrorHeader id="email-subject">
                                        {`${capitalizeFirstLetter(
                                            batchPrint.vclient_fname
                                        )} ${capitalizeFirstLetter(
                                            batchPrint.vclient_mname
                                        )} ${capitalizeFirstLetter(batchPrint.vclient_lname)}`}
                                    </ErrorHeader>
                                }
                            >
                                {viewAllListID && viewAllListID.includes(idx) ? (
                                    <>
                                        {lettersData.map((letter: any) => {
                                            return (
                                                <List key={letter.letterid} css={list} >
                                                    <span
                                                        css={{
                                                            maxWidth: '300px',
                                                            display: 'inline-block'
                                                        }}
                                                    >
                                                        {letter.lettertitles}
                                                    </span>
                                                    <span
                                                        css={{
                                                            textAlign: 'right',
                                                            color: '#4a4a4a',
                                                            fontWeight: 400,
                                                            fontSize: 12,
                                                            float: 'right'
                                                        }}
                                                    >
                                                        Created:{' '}
                                                        {moment(letter.letterdates).format('MM/DD/YYYY')}
                                                    </span>
                                                </List>
                                            );
                                        })}
                                        {viewAllListID.includes(idx) && (
                                            <List
                                                css={viewALLStyle}
                                                onClick={() => handleViewLess(idx)}
                                            >{`(View Less)`}</List>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {lettersData.slice(0, 3).map((letter: any) => {
                                            return (
                                                <List key={letter.letterid} css={list}>
                                                    <span
                                                        css={{
                                                            maxWidth: '300px',
                                                            display: 'inline-block'
                                                        }}
                                                    >
                                                        {letter.lettertitles}
                                                    </span>
                                                    <span
                                                        css={{
                                                            textAlign: 'right',
                                                            color: '#4a4a4a',
                                                            fontWeight: 400,
                                                            fontSize: 12,
                                                            float: 'right'
                                                        }}
                                                    >
                                                        Created:{' '}
                                                        {moment(letter.letterdates).format('MM/DD/YYYY')}
                                                    </span>
                                                </List>
                                            );
                                        })}
                                        {lettersData.length > 3 &&
                                            viewAllListID &&
                                            !viewAllListID.includes(idx) && (
                                                <List
                                                    css={viewALLStyle}
                                                    onClick={() => handleViewAll(idx)}
                                                >
                                                    {`(View All)`}
                                                </List>
                                            )}
                                    </>
                                )}
                            </List>
                            {size(pendingLetters) - 1 !== idx && <Divider />}
                        </>
                    );
                })}
            {
                size(pendingLetters) ? (
                    ''
                ) : (
                    <NoDataMessage>You have no pending letters</NoDataMessage>
                )
            }
        </List >
    );
};