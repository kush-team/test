/**
 * VoterController
 *
 * @description :: Server-side logic for managing voters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var json2csv = require('json2csv');

/**
 * Module dependencies
 */
var util = require( 'util' ),
  actionUtil = require( '../blueprints/_util/actionUtil' );

var performSideload = (sails.config.blueprints.ember && sails.config.blueprints.ember.sideload);

module.exports = {

	findOne: function (req, res) {
		var pk = req.params.id;

		var query = 'SELECT v.matricula as "id", v.matricula, v.sexo, v.nombre, v.apellido, v.clase, v.domicilio, s.name as "seccion", s.seccion as "town"';

		query += ', COALESCE(j.afiliado, \'No\') as "afiliado"'
		query += ' FROM voter v';
		query += ' LEFT JOIN joined j on j.matricula = v.matricula '
		query += ' LEFT JOIN town s on s.seccion = v.seccion '

		query += ' WHERE ';
		query += 'v.matricula = \'' + pk + '\';';	
		
		Voter.query(query, function (err, results) { 
			if (results.rowCount > 0) {
				res.ok({voter: results.rows[0]});
			} else {
				res.notFound( 'No record found with the specified `id`.' );
			}
		});
	},

	exportCSV: function (req, res) { 
		var pk = req.params[0];
		var query = 'SELECT v.matricula, v.sexo, v.nombre, v.apellido, v.clase, v.domicilio, v.mesa';
		if (req.query.electoral == "true") {
			query += ', s.descripcion as "Escuela", s.domicilio as "Direccion Escuela"'
		}

		if (req.query.joined == "true") {
			query += ', COALESCE(j.afiliado, \'No\') as "Afiliado"'
		}

		query += ' FROM voter v';
		
		//JOIN
		if (req.query.electoral == "true") {
			query += ' LEFT JOIN school s on v.circuito = s.circuito '
		}

		if (req.query.joined == "true") {
			query += ' LEFT JOIN joined j on j.matricula = v.matricula '
		}

		query += ' WHERE ';

		if (req.query.electoral == "true") {
			query += '(CAST(v.mesa AS INTEGER) BETWEEN CAST(s.desde AS INTEGER) AND CAST(s.hasta AS INTEGER)) AND ';
		}

		if (req.query.mesa) {
			query += 'v.mesa = \'' + req.query.mesa + '\' AND ';	
		}

		//WHERE
		query += 'v.seccion = \'' + pk + '\';';

		Voter.query(query, function (err, results) { 

 			var config = {
              fields : ['matricula','sexo', 'nombre', 'apellido', 'clase', 'domicilio', 'mesa'],
              data: results.rows
            };

            if (req.query.electoral == "true") { 
	            config.fields.push('Escuela');
	            config.fields.push('Direccion Escuela');
            }

            if (req.query.joined == "true") { 
            	config.fields.push('Afiliado');
            }

            Town.findOne({seccion: pk}).exec(function (err, instance) {
	            json2csv(config, function(err, csv) {
	              if (err) console.log(err);
	              var filename = "padron_" + instance.name.toLowerCase() + "_" + (req.query.mesa || "completo") +  ".csv";
	              res.attachment(filename);
	              res.end(csv, 'UTF-8');
	            });			
            });

		});
	},

	find: function findRecords( req, res ) {
		var pk = req.params.id;
		var params = actionUtil.parseCriteria( req );


		var matriculas = "";
		if (params.id) {
			matriculas = params.id.join(", ");
		}

		var query = 'SELECT v.matricula as "id", v.matricula, v.sexo, v.nombre, v.apellido, v.clase, v.domicilio, s.name as "seccion", s.seccion as "town"';

		query += ', COALESCE(j.afiliado, \'No\') as "afiliado"'
		query += ' FROM voter v';
		query += ' LEFT JOIN town s on s.seccion = v.seccion '
		query += ' LEFT JOIN joined j on CAST(j.matricula AS INTEGER) = CAST(v.matricula AS INTEGER)'
		query += ' WHERE ';
		query += 'CAST(v.matricula AS INTEGER) in (' + matriculas + ');';	
		
		console.log(query);
		Voter.query(query, function (err, results) { 
			console.log(err);
			if (results.rowCount > 0) {
				res.ok({voters: results.rows});
			} else {
				res.notFound( 'No record found with the specified `id`.' );
			}
		});
	}	
};

