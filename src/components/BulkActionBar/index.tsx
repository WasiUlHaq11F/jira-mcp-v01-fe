import { memo } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BulkActionConfig, BulkActionKey } from '@/types/bulkAction';

type BulkActionBarProps = {
  selectedCount: number;
  entityName: string;
  actions: BulkActionConfig[];
  onAction: (actionKey: BulkActionKey) => void;
  loadingAction: BulkActionKey | null;
};

const BulkActionBar = memo<BulkActionBarProps>(({ selectedCount, entityName, actions, onAction, loadingAction }) => {
  if (selectedCount === 0) return null;

  const entityLabel = selectedCount === 1 ? entityName.toLowerCase() : `${entityName.toLowerCase()}s`;

  return (
    <div className="flex items-center justify-between p-3 mb-4 bg-muted rounded-lg border">
      <span className="text-sm font-medium">
        {selectedCount} {entityLabel} selected
      </span>
      <div className="flex items-center gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          const isLoading = loadingAction === action.key;
          const isDisabled = loadingAction !== null;

          return (
            <Button
              key={action.key}
              variant={action.variant}
              size="sm"
              onClick={() => onAction(action.key)}
              disabled={isDisabled}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Icon className="h-4 w-4" />
              )}
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
});

BulkActionBar.displayName = 'BulkActionBar';
export default BulkActionBar;
