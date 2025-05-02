
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Map, Calendar, Filter } from 'lucide-react';

interface ParcelImportDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onImportConfirm: (importType: string) => void;
}

const ParcelImportDialog = ({ isOpen, onOpenChange, onImportConfirm }: ParcelImportDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <DialogHeader>
          <DialogTitle>Importer des données</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground dark:text-gray-400">Choisissez le type de données à importer:</p>
          <div className="grid grid-cols-1 gap-2">
            <Button 
              variant="outline" 
              className="justify-start dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600" 
              onClick={() => onImportConfirm('parcellaires')}
            >
              <Map className="h-4 w-4 mr-2" />
              Données parcellaires (CSV)
            </Button>
            <Button 
              variant="outline" 
              className="justify-start dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
              onClick={() => onImportConfirm('géospatiales')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Données géospatiales (GeoJSON)
            </Button>
            <Button 
              variant="outline" 
              className="justify-start dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
              onClick={() => onImportConfirm('de cultures')}
            >
              <Filter className="h-4 w-4 mr-2" />
              Historique des cultures (Excel)
            </Button>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelImportDialog;
