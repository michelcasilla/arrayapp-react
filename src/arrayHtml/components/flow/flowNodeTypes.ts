import type { NodeTypes } from '@xyflow/react'

import { PiggyBankNode } from '../PiggyBankNode'
import { BasicsLabelNode } from './nodes/BasicsLabelNode'
import { BasicsPanelNode } from './nodes/BasicsPanelNode'
import { ExpertsNode } from './nodes/ExpertsNode'
import { KeyPieceIconNode } from './nodes/KeyPieceIconNode'
import { KeyPiecesLabelNode } from './nodes/KeyPiecesLabelNode'
import { KeyPiecesPanelNode } from './nodes/KeyPiecesPanelNode'
import { PuNode } from './nodes/PuNode'
import { TreeCardNode } from './nodes/TreeCardNode'

export const flowNodeTypes: NodeTypes = {
  piggyBank: PiggyBankNode,
  treeCard: TreeCardNode,
  puNode: PuNode,
  basicsLabel: BasicsLabelNode,
  keyPieceIcon: KeyPieceIconNode,
  keyPiecesLabel: KeyPiecesLabelNode,
  expertsNode: ExpertsNode,
  keyPiecesPanel: KeyPiecesPanelNode,
  basicsPanel: BasicsPanelNode,
}
