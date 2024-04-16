import {
  Box,
  CircularProgress,
  css,
  Divider,
  Grid,
  Stack,
  Tooltip
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetLeadsDetailsQuery } from './leads.api';
import { get, isEmpty } from 'lodash-es';
import { CustomButton, CustomizedTooltip } from '../../components';
import moment from 'moment';
import React from 'react';
type ViewLeadsProps = {
  id: number;
};
export const ViewLeads = (props: ViewLeadsProps) => {
  const { id } = props;
  const { data, isFetching, refetch } = useGetLeadsDetailsQuery({ id: id });
  const [leadDetails, setLeadDetails] = useState({
    id: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    phone_home: '',
    phone_work: '',
    mobile: '',
    fax: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    dob: '',
    last_4_ssn: '',
    memo: '',
    referred_first_name: '',
    referred_last_name: '',
    source_url: '',
    source_ip_address: '',
    source: '',
    phone: '',
    postcode: '',
    ssn: ''
  });
  useEffect(() => {
    if (!isEmpty(data)) {
      const leadData: any = get(data, 'lead_details');
      setLeadDetails(leadData);
    }
  }, [data]);
  const viewLead = css`
    .m-b-4 {
      margin-bottom: 4px !important;
    }
    .m-b-15 {
      margin-bottom: 20px !important;
    }
    .m-b-0 {
      margin-bottom: 0px !important;
    }
    .m-auto {
      margin: auto !important;
    }
    label {
      color: #666;
      font-size: 12px !important;
    }
    .capitalize {
      text-transform: capitalize !important;
    }
    .text-overflow {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 14px;
      color: #4a4a4a;
      margin-top: 0px;
    }
    .custombuttons button {
      padding: 7px 8px;
      font-weight: 600;
      border: solid 2px #666;
      color: #666;
      line-height: 22px;
    }
    .editleadbtn button {
      border: 2px solid #00a650;
      color: 00a650;
      padding: 7px 8px;
      line-height: 22px;
      width: 140px;
    }
    .addclientbtn button {
      color: #fff;
      background: #00a650;
      padding: 7px 8px;
      line-height: 26px;
    }
  `;
  const tooltipContainer = css`
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
  `;

  return (
    <div>
      <Grid>
        {isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box css={viewLead}>
            <Grid
              container
              className="m-b-4"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={3.5}>
                <label>First Name</label>
                <p
                  className="capitalize text-overflow"
                  css={tooltipContainer}
                  title={leadDetails.first_name}
                >
                  {leadDetails.first_name}
                </p>
              </Grid>
              <Grid item xs={12} md={3.5}>
                <label> Middle Name</label>
                <p
                  className="capitalize text-overflow"
                  title={leadDetails.middle_name}
                >
                  {leadDetails.middle_name}
                </p>
              </Grid>
              <Grid item xs={12} md={5}>
                <label>Last Name</label>
                <p
                  className="capitalize text-overflow"
                  title={leadDetails.last_name}
                >
                  {leadDetails.last_name}
                </p>
              </Grid>
            </Grid>
            <Grid
              container
              className="m-b-4"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={3.5}>
                <label> Phone (Mobile)</label>
                <p>{leadDetails.mobile}</p>
              </Grid>
              <Grid item xs={12} md={3.5}>
                <label>Phone (Alternate)</label>
                <p>{leadDetails.phone}</p>
              </Grid>

              <Grid item xs={12} md={5}>
                <label>Email</label>
                <p className="text-overflow" title={leadDetails.email}>
                  {leadDetails.email}
                </p>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: '10px' }} />

            <Grid
              container
              className="m-b-4"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={3.5}>
                <label>Mailing Address</label>
                <p>{leadDetails.address}</p>
              </Grid>
              <Grid item xs={12} md={3.5}>
                <label>City</label>
                <p>{leadDetails.city}</p>
              </Grid>
              <Grid item xs={12} md={2.5}>
                <label>State</label>
                <p>{leadDetails.state}</p>
              </Grid>
              <Grid item xs={12} md={2.5}>
                <label>Zip Code</label>
                <p>{leadDetails.postcode}</p>
              </Grid>
            </Grid>

            <Grid
              container
              className="m-b-4"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={3.5}>
                <label>Last 4 of SSN</label>
                <p>{leadDetails.ssn}</p>
              </Grid>
              <Grid item xs={12} md={3.5}>
                <label> Date of Birth</label>
                <p>
                  {leadDetails.dob === '0000-00-00'
                    ? ''
                    : moment(leadDetails.dob).format('L')}
                </p>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: '10px' }} />

            <Grid
              container
              className="m-b-4"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={3.5}>
                <label> Referred By</label>
                <p className="m-b-0">
                  {leadDetails.referred_first_name}{' '}
                  {leadDetails.referred_last_name}
                </p>
                {/* <p></p> */}
              </Grid>
              <Grid item xs={12} md={4}>
                <label> Web Lead From Response</label>
                <p>{leadDetails.memo}</p>
              </Grid>
            </Grid>
            <Grid
              container
              className="m-b-15"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={4}>
                {leadDetails?.source && (
                  <>
                    <label className="">Source</label>
                    <p>
                      URL:
                      <br />
                      {leadDetails?.source
                        ? leadDetails?.source.split('|').join('IP:')
                        : null}
                    </p>
                  </>
                )}
              </Grid>
            </Grid>
            <Stack direction="row">
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  '@media only screen and (max-width:600px)': {
                    display: 'block',
                    textAlign: 'center'
                  }
                }}
              >
                <Grid
                  className="custombuttons"
                  item
                  xs={12}
                  md={4.5}
                  alignItems="flex-start"
                  gap={1}
                  direction="column"
                >
                  <CustomButton
                    variant="outlined"
                    color="inherit"
                    label="Invite to Credit Hero Score"
                    size="medium"
                    onClick={() => {}}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={1.5}
                  className="m-auto"
                  sx={{
                    marginTop: '0',
                    '@media only screen and (max-width:600px)': {
                      display: 'none'
                    }
                  }}
                >
                  <CustomizedTooltip
                    title={
                      <React.Fragment>
                        <span color="inherit">
                          Credit Hero Score can be used with
                        </span>
                        <b className="ml-3 mr-3">
                          <i>{'leads'}</i>
                        </b>
                        <span>
                          to import credit reports, scores, run an audit & close
                          the deal!
                        </span>
                        .
                      </React.Fragment>
                    }
                    placement={'top'}
                    arrow={true}
                  >
                    <img
                      css={{
                        marginTop: '3px',
                        ':hover': { cursor: 'pointer' }
                      }}
                      className="hover:cursor-pointer"
                      width={'16px'}
                      src="https://qa.creditrepaircloud.com/assets/images/infopic.png"
                      alt=""
                    />
                  </CustomizedTooltip>
                </Grid>
                <Grid
                  className="editleadbtn"
                  item
                  xs={12}
                  md={3}
                  sx={{
                    marginTop: '0',
                    '@media only screen and (max-width:600px)': {
                      marginTop: '10px'
                    }
                  }}
                >
                  <CustomButton
                    variant="outlined"
                    color="success"
                    label="Edit This Lead"
                    size="medium"
                    onClick={() => {}}
                  />
                </Grid>

                <Grid
                  className="addclientbtn"
                  item
                  xs={12}
                  md={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    '@media only screen and (max-width:600px)': {
                      justifyContent: 'center',
                      marginTop: '10px'
                    }
                  }}
                >
                  <CustomButton
                    variant="contained"
                    color="success"
                    label="Add As Client"
                    size="medium"
                    onClick={() => {}}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Box>
        )}
      </Grid>
    </div>
  );
};
