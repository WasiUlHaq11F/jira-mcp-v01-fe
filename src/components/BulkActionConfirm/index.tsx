import { memo, useCallback } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BulkActionConfig, confirmationStyles } from '@/types/bulkAction';

type BulkActionConfirmProps = {
  open: boolean;
  config: BulkActionConfig | undefined;
  count: number;
  entityName: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const BulkActionConfirm = memo<BulkActionConfirmProps>(({ open, config, count, entityName, isLoading = false, onConfirm, onClose }) => {
  const { t } = useTranslation(['common']);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  const handleConfirm = useCallback(() => {
    if (!isLoading) {
      onConfirm();
    }
  }, [isLoading, onConfirm]);

  if (!config) return null;

  const styles = confirmationStyles[config.confirmation.type];
  const Icon = config.icon;
  const entityLabel = count === 1 ? entityName : `${entityName}s`;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isLoading) {
          handleClose();
        }
      }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-left">
          <DialogTitle className="flex items-center justify-center gap-3 sm:justify-start text-lg">
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-full', styles.iconBg)}>
              <Icon className={cn('h-5 w-5', styles.iconColor)} />
            </div>
            <span className="font-semibold">{config.confirmation.title}</span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            {config.confirmation.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:items-start">
          <div className={cn('hidden sm:flex h-12 w-12 items-center justify-center rounded-full', styles.warningBg)}>
            <AlertTriangle className={cn('h-6 w-6', styles.warningIcon)} />
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <p className="text-sm text-muted-foreground leading-relaxed">{config.confirmation.description}</p>
            <p className="font-medium text-foreground bg-muted px-3 py-2 rounded-md text-sm">
              {count} {entityLabel} selected
            </p>
            {config.confirmation.type === 'danger' && (
              <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading} className="w-full sm:w-auto order-2 sm:order-1">
            {t('cancel')}
          </Button>

          <Button
            variant={styles.buttonVariant}
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn('w-full sm:w-auto order-1 sm:order-2 min-w-[100px]', isLoading && 'cursor-not-allowed')}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{config.confirmation.confirmLabel}</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

BulkActionConfirm.displayName = 'BulkActionConfirm';
export default BulkActionConfirm;
