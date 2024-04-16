import { Divider, List } from '@mui/material';
import { size } from 'lodash-es';
import moment from 'moment';
import { FC, useState } from 'react';
import { capitalizeFirstLetter } from '../../utils';
import {
    emailMenuStyles,
    ErrorHeader,
    NoDataMessage,
    viewALLStyle,
    viewDetailsStyle
} from './styles';
type CloudMailAlertsTabsProps = {
    mailErrors: any;
};
export const LetterStatusText = (letterStatus: any) => {
    return (
        <>
            {letterStatus.letterStatus && Array.isArray(letterStatus.letterStatus) ? (
                letterStatus.letterStatus.map((letter: string, index: number) => {
                    return (
                        <>
                            {index === 0 ? (
                                <span css={{ color: '#c61d15', fontWeight: 700 }}>
                                    {letter}:
                                </span>
                            ) : (
                                <span css={{ color: '#c61d15' }}>{letter} </span>
                            )}
                        </>
                    );
                })
            ) : (
                <span css={{ color: '#c61d15' }}>{letterStatus?.letterStatus} </span>
            )}
            <span css={viewDetailsStyle}
                onClick={() => { }}
            >
                {`(View Details)`}
            </span>
        </>
    );
};
export const CloudMailAlertsTab: FC<CloudMailAlertsTabsProps> = ({
    mailErrors
}: CloudMailAlertsTabsProps) => {
    const [viewAllListID, setViewAllListID] = useState<any>([]);
    const { list } = emailMenuStyles;
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
            {mailErrors &&
                mailErrors.map((mailError: any, idx: number) => {
                    const mailErrorData = mailError?.errors;
                    return (
                        <>
                            <List
                                key={idx}
                                subheader={
                                    <ErrorHeader id="email-subject">
                                        {`${capitalizeFirstLetter(mailError.first_name)} ${capitalizeFirstLetter(mailError.middle_name)
                                            } ${capitalizeFirstLetter(mailError.last_name)}`}
                                    </ErrorHeader>
                                }
                            >
                                {viewAllListID && viewAllListID.includes(idx) ? (
                                    <>
                                        {mailErrorData &&
                                            mailErrorData.map((error: any) => {
                                                return (
                                                    <List key={error.id} css={list}>
                                                        <span>{error.title}: </span>
                                                        <LetterStatusText
                                                            letterStatus={error.letter_status}
                                                        />
                                                        <p
                                                            css={{
                                                                textAlign: 'right',
                                                                color: '#4a4a4a',
                                                                fontWeight: 400,
                                                                fontSize: 12
                                                            }}
                                                        >
                                                            {moment(error.created_on).format(
                                                                'MM/DD/YYYY hh:mm A'
                                                            )}
                                                        </p>
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
                                        {mailErrorData &&
                                            mailErrorData.slice(0, 3).map((error: any) => {
                                                return (
                                                    <List key={error.id} css={list}>
                                                        <span>{error.title}: </span>
                                                        <LetterStatusText
                                                            letterStatus={error.letter_status}
                                                        />
                                                        <p
                                                            css={{
                                                                textAlign: 'right',
                                                                color: '#4a4a4a',
                                                                fontWeight: 400,
                                                                fontSize: 12,
                                                                marginBottom:'0'
                                                            }}
                                                        >
                                                            {moment(error.created_on).format(
                                                                'MM/DD/YYYY hh:mm A'
                                                            )}
                                                        </p>
                                                    </List>
                                                );
                                            })}
                                        {mailErrorData &&
                                            mailErrorData.length > 3 &&
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
                            {size(mailErrors) - 1 !== idx && <Divider />}
                        </>
                    );
                })}
            {size(mailErrors) ? (
                ''
            ) : (
                <NoDataMessage>You have no new mail alerts</NoDataMessage>
            )}
        </List>
    );
};
