export const STATUS_SUBMITTED = 'submitted';
export const STATUS_UPLOADED = 'uploaded';
export const STATUS_ARRANGED = 'arranged';
export const STATUS_INSPECTED = 'inspected';
export const STATUS_CANCELLED = 'cancelled';
export const STATUS_FINISHED = 'finished';
export const STATUS_TRANSFERRED = 'transferred';

export const getStatus = (status) => {
  if (status?.transferred) {
    return STATUS_TRANSFERRED;
  } else if (status?.finished) {
    return STATUS_FINISHED;
  } else if (status?.cancelled) {
    return STATUS_CANCELLED;
  } else if (status?.uploaded) {
    return STATUS_UPLOADED;
  } else if (status?.inspected) {
    return STATUS_INSPECTED;
  } else if (status?.arranged) {
    return STATUS_ARRANGED;
  } else if (status?.submitted) {
    return STATUS_SUBMITTED;
  }
};
