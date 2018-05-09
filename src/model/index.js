//节点父类
Node = function Node(id, top, left, name, label) {
    this.id = id;
    this.width = 44;
    this.height = 44;
    this.top = top;
    this.left = left;
    this.name = name;
    this.label = label;
}
Node.prototype.toJson = function () {
    return JSON.stringify(this);
}
Node.prototype.move = function (x, y) {
    this.left += x;
    tihs.top += y;
}
Node.prototype.moveTo = function (x, y, edge) {
    x = x < 0 + this.width / 2 ? this.width / 2 : x;
    y = y < 0 + this.height / 2 ? this.height / 2 : y;
    x = x > edge[0] - this.width / 2 ? edge[0] - this.width / 2 : x;
    y = y > edge[1] - this.height / 2 ? edge[1] - this.height / 2 : y;
    this.left = x;
    this.top = y;
}
Node.prototype.isCoverPoint = function (point) {
    return (point.x > this.left - this.width / 2 && point.x < this.left + this.width / 2 && point.y > this.top - this.height / 2 && point.y < this.top + this.height / 2)
}
Node.prototype.isInRange = function (range) {
    return (range.x1 < this.left - this.width / 2 && range.x2 > this.left + this.width / 2 && range.y1 < this.top - this.height / 2 && this.y2 > this.top + this.height / 2)
}

//开始节点类
function Startup(id, top, left, sortKey, forced, form) {
    Node.call(this, id, top, left, 'Startup1', '起草', id);
    this.sortKey = sortKey;
    this.forced = forced;
    this.form = form;
}
Startup.prototype.toJson = function () {
    return {
        id: this.id,
        width: this.width,
        height: this.height,
        top: this.top,
        left: this.left,
        name: this.name,
        label: this.label,
        sortKey: this.sortKey,
        forced: this.forced,
        form: this.form
    }
}

//结束节点类
function Finish(id, top, left) {
    Node.call(this, id, top, left, 'Finish', '结束', id);
}


//人员节点类
function Human(id, top, left, name, label, sortKey, forced, form, selfCycle, multiHumain, callback) {
    Node.call(this, id, top, left, name, label);
    this.sortKey = sortKey;
    this.forced = forced;
    this.form = form;
    this.selfCycle = selfCycle;
    this.multiHumain = multiHumain;
    this.callback = callback;
}
Human.prototype = new Node();
Human.prototype.toJson = function () {
    return {
        id: this.id,
        width: this.width,
        height: this.height,
        top: this.top,
        left: this.left,
        name: this.name,
        label: this.label,
        sortKey: this.sortKey,
        forced: this.forced,
        form: this.form,
        selfCycle: this.selfCycle,
        multiHuman: this.multiHumain,
        callback: this.callback
    }
}
//候选人规则
function CandidateRule(candidate) {
    this.candidate = candidate;
}
function Candidate(customPolicy, forceUseQueue, forceMatchName, useBusiness, variable, allowForward, forwardPolicy, allowAvoid, avoidPolicy, avoidSubmitPolicy) {
    this.customPolicy = customPolicy;
    this.forceUseQueue = forceUseQueue;
    this.forceMatchName = forceMatchName;
    this.useBusiness = useBusiness;
    this.variable = variable;
    this.allowForward = allowForward;
    this.forwardPolicy = forwardPolicy;
    this.allowAvoid = allowAvoid;
    this.avoidPolicy = avoidPolicy;
    this.avoidSubmitPolicy = avoidSubmitPolicy;
}
//线
function Linkline(id, p1_x, p1_y, p2_x, p2_y, human1, human2, label, rule) {
    //<Linkline ID="1663348c-1f42-4f1b-990b-20884aa09bdd" Width="55" Height="1" Top="38" Left="69" Arrow1Size="0" Arrow2Size="5" P1_X="69" P1_Y="38" P2_X="124" P2_Y="39" LinkElement1="c8eb7124-87f9-417a-9ae1-4bd249ea474a" LinkElement2="2bd710ab-406c-4058-92d7-a0434274d806" Label="" Conditions="" />
    this.id = id;
    this.p1_x = p1_x;
    this.p1_y = p1_y;
    this.p2_x = p2_x;
    this.p2_y = p2_y;
    this.human1 = human1;
    this.human2 = human2;
    this.label = label;
    this.rule = rule;
}
Linkline.prototype.move = function (x, y, side, edge) {
    this['p' + side + '_x'] = x;
    this['p' + side + '_y'] = y;
}
Linkline.prototype.moveTo = function (x, y, side, edge) {
    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;
    x = x > edge[0] ? edge[0] : x;
    y = y > edge[1] ? edge[1] : y;
    this.left = x;
    this.top = y;
    this['p' + side + '_x'] = x;
    this['p' + side + '_y'] = y;
}
Linkline.prototype.addHuman = function (human, side) {
    this['human' + side] = human;
    human['linkline' + side] = this;
}
Linkline.prototype.adjust = function () {
    if (!this.human1 && !this.human2) {
        return;
    }
    let x1 = this.p1_x;
    let y1 = this.p1_y;
    let x2 = this.p2_x;
    let y2 = this.p2_y;
    if (this.human1) {
        x1 = this.human1.left;
        y1 = this.human1.top;
    }
    if (this.human2) {
        x2 = this.human2.left;
        y2 = this.human2.top;
    }
    let a = 180 - (180 * Math.atan2(x2 - x1, y2 - y1) / Math.PI);
    if (a >= 315 || a < 45) {
        if (this.human1) {
            this.p1_x = this.human1.left;
            this.p1_y = this.human1.top - this.human1.height / 2;
        }
        if (this.human2) {
            this.p2_x = this.human2.left;
            this.p2_y = this.human2.top + this.human2.height / 2;
        }
    }
    else if (a >= 45 && a <= 135) {
        if (this.human1) {
            this.p1_x = this.human1.left + this.human1.width / 2;
            this.p1_y = this.human1.top;
        }
        if (this.human2) {
            this.p2_x = this.human2.left - this.human2.width / 2;
            this.p2_y = this.human2.top;
        }
    }
    else if (a >= 135 && a < 225) {
        if (this.human1) {
            this.p1_x = this.human1.left;
            this.p1_y = this.human1.top + this.human1.height / 2;
        }
        if (this.human2) {
            this.p2_x = this.human2.left;
            this.p2_y = this.human2.top - this.human2.height / 2;
        }
    }
    else if (a >= 225 && a < 315) {
        if (this.human1) {
            this.p1_x = this.human1.left - this.human1.width / 2;
            this.p1_y = this.human1.top;
        }
        if (this.human2) {
            this.p2_x = this.human2.left + this.human2.width / 2;
            this.p2_y = this.human2.top;
        }
    }
}
Linkline.prototype.toJson = function () {

}
//条件属性
function Rule() {

}
//附件属性
function AttachmentConfiguration(attachmentPolicy) {

}
function AttachmentPolicy() {

}
//退回属性
function Callback() {

}
export default { Human, Linkline };