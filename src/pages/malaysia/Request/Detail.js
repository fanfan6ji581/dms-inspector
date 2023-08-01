import { useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';

import { requestS } from '../../../reducers/malaysiaSlice';
import SubCard from '../../../ui-component/cards/SubCard';

const RequestDetail = ({ setTabIndex }) => {
  const componentRef = useRef();
  const request = useSelector(requestS);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={9} lg={7}>
          <SubCard
            title="REQUEST FOR INSPECTION"
            subheader={request.jobNo}
            secondary={
              <>
                <IconButton
                  disabled={request?.status?.inspected || request?.status?.finished || request?.status?.cancelled}
                  onClick={() => setTabIndex(2)}
                >
                  <EditIcon />
                </IconButton>
                <ReactToPrint
                  content={() => componentRef.current}
                  pageStyle={`
                      @page { size: A4; margin: 0mm; }
                      @media print {
                          body { -webkit-print-color-adjust: exact;
                        }
                      }
                  `}
                >
                  <PrintContextConsumer>
                    {({ handlePrint }) => (
                      <IconButton onClick={handlePrint}>
                        <PrintIcon />
                      </IconButton>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
              </>
            }
          >
            <Grid
              container
              spacing={4}
              ref={componentRef}
              sx={{
                '@media print': {
                  p: 3,
                },
              }}
            >
              <Grid item xs={12} sx={{ display: 'none', displayPrint: 'block' }}>
                <Stack textAlign="center">
                  <Typography variant="subtitle2" color="text.secondary">
                    ALEX STEWART INTERNATIONAL (AUSTRALIA) PTY LTD
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Suite 1.8, Level 1, 741 Pacific Highway, Gordon NSW 2072, Australia
                  </Typography>
                  <Stack direction="row" spacing={3} justifyContent="center">
                    <Typography variant="subtitle2" color="text.secondary">
                      Tel: +61 2 9418 2888
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Fax: +61 2 9418 2889
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      E-mail: general@alexstewart.com.au
                    </Typography>
                  </Stack>
                  <Typography variant="h3" sx={{ mt: 3 }}>
                    REQUEST FOR INSPECTION - MALAYSIA
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {request.jobNo}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ display: 'none', displayPrint: 'block' }}>
                <Divider />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Exporter / Importer
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Exporter:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.exporterName}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Address:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.exporterAddress}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Contact:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.exporterContact}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Tel:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.exporterTel}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Fax:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.exporterFax}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" color="grey">
                    Importer:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.importerName}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Importer Address:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.importerAddress}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Supplier
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Name:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.supplierName}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Address:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.supplierAddress}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Contact:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.supplierContact}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Tel:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.supplierTel}
                  </Typography>
                </Stack>

                {request.supplierFax && (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1" color="grey">
                      Fax:
                    </Typography>
                    <Typography variant="body1" sx={{ pt: 0.375 }}>
                      {request.supplierFax}
                    </Typography>
                  </Stack>
                )}
                {request.supplierEmail && (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1" color="grey">
                      Email:
                    </Typography>
                    <Typography variant="body1" sx={{ pt: 0.375 }}>
                      {request.supplierEmail}
                    </Typography>
                  </Stack>
                )}
              </Grid>

              <Grid item xs={12} sx={{ display: 'block', displayPrint: 'none' }}>
                <Divider />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Manufacturer
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Name:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.manufacturerName}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    License:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.manufacturerLicense}
                  </Typography>
                </Stack>

                {request.manufacturerAddress && (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1" color="grey">
                      Address:
                    </Typography>
                    <Typography variant="body1" sx={{ pt: 0.375 }}>
                      {request.manufacturerAddress}
                    </Typography>
                  </Stack>
                )}

                {request.manufacturerContact && (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1" color="grey">
                      Contact:
                    </Typography>
                    <Typography variant="body1" sx={{ pt: 0.375 }}>
                      {request.manufacturerContact}
                    </Typography>
                  </Stack>
                )}

                {request.manufacturerTel && (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1" color="grey">
                      Tel:
                    </Typography>
                    <Typography variant="body1" sx={{ pt: 0.375 }}>
                      {request.manufacturerTel}
                    </Typography>
                  </Stack>
                )}
                {request.manufacturerFax && (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1" color="grey">
                      Fax:
                    </Typography>
                    <Typography variant="body1" sx={{ pt: 0.375 }}>
                      {request.manufacturerFax}
                    </Typography>
                  </Stack>
                )}

                {request.manufacturerEmail && (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1" color="grey">
                      Email:
                    </Typography>
                    <Typography variant="body1" sx={{ pt: 0.375 }}>
                      {request.manufacturerEmail}
                    </Typography>
                  </Stack>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Inspection
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Packing Yard:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.packingYard}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Address:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.inspectionAddress}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Packer Contact:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.packerContact}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Packer Tel:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.packerTel}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ display: 'block', displayPrint: 'none' }}>
                <Divider />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Goods
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Type:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.goodsType}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    PO No.:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.poNo}
                  </Typography>
                </Stack>

                {request.invoice && (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="subtitle1" color="grey">
                      Invoice No:
                    </Typography>
                    <Typography variant="body1" sx={{ pt: 0.375 }}>
                      {request.invoice}
                    </Typography>
                  </Stack>
                )}

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Grade of material:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.gradeOfMaterial}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Equipment Details:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.equipmentDetails}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Calibration:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.calibration}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" color="grey">
                    Number of Containers:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.numOfContainers} x {request.containerSize}'
                  </Typography>
                </Stack>

                {/* <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Total Bales of Shipment:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.bales}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Loading Quantity:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.loadingQuantity}
                  </Typography>
                </Stack> */}

                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Description:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.description}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6} sx={{ display: { xs: 'block', md: 'none' } }}>
                <Divider />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Shipping
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Shipper's Ref No:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.shipperRef}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Vessel Name:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.vessel}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" color="grey">
                    Loading Commence:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.loadingCommenceDate}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Loading Complete:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.loadingCompleteDate}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" color="grey">
                    Onboard:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.onboardDate}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Cut-off:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.cutoffDate}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Typography variant="subtitle1" color="grey">
                    Estimate Departure:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.etdDate}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" color="grey">
                    Estimate Arrival:
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    {request.etaDate}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ display: 'block', displayPrint: 'none' }}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Special Request
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body1" sx={{ pt: 0.375 }}>
                    Inspection of Waste of Non Hazardous and Non Toxic Materials
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                  Remark
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body1" sx={{ pt: 0.375, whiteSpace: 'pre-line' }}>
                    {request.remark}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </>
  );
};

export default RequestDetail;
