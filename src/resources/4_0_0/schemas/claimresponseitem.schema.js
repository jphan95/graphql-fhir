const {
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
} = require('graphql');
const PositiveIntScalar = require('../scalars/positiveint.scalar.js');

/**
 * @name exports
 * @summary ClaimResponseitem Schema
 */
module.exports = new GraphQLObjectType({
	name: 'ClaimResponseitem',
	description: '',
	fields: () => ({
		_id: {
			type: require('./element.schema.js'),
			description:
				'Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		id: {
			type: GraphQLString,
			description:
				'Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the element and that modifies the understanding of the element in which it is contained and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		_itemSequence: {
			type: require('./element.schema.js'),
			description: 'A number to uniquely reference the claim item entries.',
		},
		itemSequence: {
			type: new GraphQLNonNull(PositiveIntScalar),
			description: 'A number to uniquely reference the claim item entries.',
		},
		_noteNumber: {
			type: require('./element.schema.js'),
			description:
				'The numbers associated with notes below which apply to the adjudication of this item.',
		},
		noteNumber: {
			type: new GraphQLList(PositiveIntScalar),
			description:
				'The numbers associated with notes below which apply to the adjudication of this item.',
		},
		adjudication: {
			type: new GraphQLList(
				new GraphQLNonNull(
					require('./claimresponseitemadjudication.schema.js'),
				),
			),
			description:
				'If this item is a group then the values here are a summary of the adjudication of the detail items. If this item is a simple product or service then this is the result of the adjudication of this item.',
		},
		detail: {
			type: new GraphQLList(require('./claimresponseitemdetail.schema.js')),
			description:
				"A claim detail. Either a simple (a product or service) or a 'group' of sub-details which are simple items.",
		},
	}),
});
