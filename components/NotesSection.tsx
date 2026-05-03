import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface NotesSectionProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

export function NotesSection({ notes, onNotesChange }: NotesSectionProps) {
  return (
    <div className="border-b border-gray-200 py-8">
      <div>
        <Label htmlFor="notes" className="text-sm font-semibold text-gray-900 mb-3 block">
          Notes & Terms
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={6}
          placeholder="Add any notes or terms here..."
          className="border-gray-300 text-sm"
        />
      </div>
    </div>
  );
}
